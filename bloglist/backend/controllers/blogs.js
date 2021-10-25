const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  let authToken = null;
  let decodedToken = null;

  if (
    authorization &&
    authorization.toLowerCase().startsWith('bearer ')
  ) {
    authToken = authorization.substring(7);
  }

  if (authToken) {
    decodedToken = jwt.verify(authToken, process.env.SECRET);
  }

  if (!authToken || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid' });
  }

  request.user = decodedToken.id;
  next();
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    if (!body.comment) {
      return response
        .status(400)
        .json({ error: 'malformed request syntax' });
    }
    blog.comments.push(body.comment);
    const updatedBlog = await blog.save();
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete(
  '/:id',
  userExtractor,
  async (request, response) => {
    const userId = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    if (blog.user.toString() !== userId) {
      return response
        .status(403)
        .json({ error: 'unauthorized request' });
    }

    await blog.remove();
    return response.status(204).end();
  }
);

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const populatedBlog = await Blog.findById(savedBlog._id).populate(
    'user',
    {
      username: 1,
      name: 1,
    }
  );

  response.status(201).json(populatedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const update = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    update,
    {
      new: true,
    }
  );

  if (updatedBlog) {
    const populatedBlog = await Blog.findById(
      updatedBlog.id
    ).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(populatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;

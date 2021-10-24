import blogsService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data);
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
      const newBlog = await blogsService.create(blog);
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });
  };
};

export const removeBlogById = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id);
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.update(blog.id, blog);
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    });
  };
};

export default blogReducer;

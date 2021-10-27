import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs.sort((objA, objB) => {
      return objB.likes - objA.likes;
    });
  });

  return (
    <>
      <table className=" w-full mt-2 lg:shadow-xl rounded-b-2xl pb-4">
        <thead className="">
          <tr className="bg-blue-300 ">
            <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 hidden lg:table-cell rounded-tl-xl">
              Title
            </th>
            <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 hidden lg:table-cell ">
              Author
            </th>
            <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 hidden lg:table-cell rounded-tr-xl">
              Added by
            </th>
          </tr>
        </thead>
        <tbody className="">
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className=" flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 border-0 shadow-xl lg:shadow-none"
            >
              <td className="bg-white lg:bg-transparent w-full lg:w-auto pt-7 pb-3 px-3 lg:p-3 text-gray-800 text-center border border-b lg:border-0 block lg:table-cell relative lg:static ">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Title
                </span>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td className="bg-white lg:bg-transparent w-full lg:w-auto pt-7 pb-3 px-3 lg:p-3 text-gray-800 text-center border border-b lg:border-0 block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Author
                </span>
                {blog.author}
              </td>
              <td className="bg-white lg:bg-transparent w-full lg:w-auto pt-7 pb-3 px-3 lg:p-3 text-gray-800 text-center border border-b lg:border-0 block lg:table-cell relative lg:static ">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Added by
                </span>
                {blog.user.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Blogs;

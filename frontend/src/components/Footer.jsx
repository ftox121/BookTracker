import React from 'react';
import { FaGithubSquare } from 'react-icons/fa';
import { FaVk, FaTelegram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div id="footer" className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>BlockFusion</h1>
        <p className='py-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum omnis modi consequatur, numquam fuga, eius quos, in tempora minima dolorem nulla fugiat! Hic ea quod perferendis quas enim aut ratione?
        </p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <a href="https://github.com/ftox121" target="_blank" rel="noopener noreferrer">
            <FaGithubSquare size={30} />
          </a>
          <a href="https://t.me/ftox121" target="_blank" rel="noopener noreferrer">
            <FaTelegram size={30} />
          </a>
          <a href="https://vk.com/id173986302" target="_blank" rel="noopener noreferrer">
            <FaVk size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

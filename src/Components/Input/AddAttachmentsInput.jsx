import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlus } from 'react-icons/hi2';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachment, setAttachment }) => {
  const [option, setOption] = useState('');

  const handleAddAttachment = () => {
    if (option.trim()) {
      setAttachment([...attachment, option.trim()]);
      setOption('');
    }
  };

  const handleDelete = (index) => {
    const updatedArr = attachment.filter((_, idx) => idx !== index);
    setAttachment(updatedArr);
  };

  return (
    <>
      <div>
        {attachment.map((item, index) => (
          <div
            key={index}
            className='flex justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2'
          >
            <div className='flex-1 flex items-center gap-3'>
                <LuPaperclip />
                <p className='text-sm text-black'>
                <span className='text-xs text-gray-400 font-semibold mr-2'>
                    {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                {item}
                </p>
            </div>
            <button className='cursor-pointer' onClick={() => handleDelete(index)}>
              <HiOutlineTrash className='text-lg text-red-500' />
            </button>
          </div>
        ))}

        <div className='flex items-center gap-5 mt-4'>
          <div className='flex items-center gap-4 w-full'>
            <LuPaperclip />
            <input
              type="text"
              placeholder='Add Attachment'
              value={option}
              onChange={({ target }) => setOption(target.value)}
              className='w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md'
            />
            <button
              className='card-btn text-nowrap'
              onClick={handleAddAttachment}
              disabled={!option.trim()} // Disable button if input is empty
            >
              <HiMiniPlus className='text-lg' /> Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAttachmentsInput;

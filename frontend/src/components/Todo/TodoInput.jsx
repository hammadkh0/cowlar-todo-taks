/* eslint-disable react/prop-types */
import { BsPlus } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { ImSpinner3 } from "react-icons/im";
const TodoInput = ({ handleSubmit, inputRef, loading }) => {
  return (
    <form
      className="flex w-[40%] my-0 mx-auto gap-[10px] bg-[#424242a4] rounded-lg mt-4 p-[10px]"
      onSubmit={handleSubmit}
    >
      <BsPlus
        size={25}
        color="white"
        onClick={() => {
          inputRef.current.focus();
        }}
      />
      <input
        className="w-[88%] text-white text-lg bg-transparent border-none outline-none placeholder:text-[#CAC6C6]"
        type="text"
        name="addTodo"
        id="addTodo"
        placeholder="Add Task"
        ref={inputRef}
      />
      {!loading ? (
        <IoSendSharp size={25} color="white" onClick={handleSubmit} />
      ) : (
        <ImSpinner3 size={25} color="white" />
      )}
    </form>
  );
};

export default TodoInput;

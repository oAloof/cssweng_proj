import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Dropdown = ({ options, placeholder, initialValue }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  const buttonText = selectedOption ? selectedOption.text : placeholder;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false);
    option.onClick();
  };

  return (
    <div className="flex items-center">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-700 transition-colors py-2 px-3 justify-between h-8 w-[200px]"
        >
          <span className="font-medium text-sm">{buttonText}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        {options && options.length > 0 && (
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-10"
          >
            {options.map((option, index) => (
              <Option
                key={index}
                setSelectedOption={setSelectedOption}
                setOpen={setOpen}
                text={option.text}
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
};

const Option = ({ text, setSelectedOption, setOpen, onClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setSelectedOption({ text });
        setOpen(false);
        onClick();
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

export default Dropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      duration: 0.05,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

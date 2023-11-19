import { FiChevronDown } from "react-icons/fi";
const ExpandableSection = ({ title, subtitle, isOpen, onToggle, children }) => {
  return (
    <div className="rounded-xl border-[1px] bg-white border-slate-300 shadow-xl">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="font-Proxima font-bold text-3xl m-0">{title}</h2>
        <div className="h-full">
          <div className="flex justify-end gap-4 items-center flex-row">
            <p className="font-Nunito text-slate-500 font-bold text-lg m-0">
              {subtitle}
            </p>
            <div
              className={`transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <FiChevronDown className="stroke-slate-700 text-2xl" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="pt-0 pb-4 px-4">{children}</div>}
    </div>
  );
};

export default ExpandableSection;

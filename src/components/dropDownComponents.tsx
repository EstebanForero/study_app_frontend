
import { useState } from 'react'

interface Props {
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
}

const DropDownComponent = ({ options, onSelect, className }: Props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={`relative text-left ${className || ""}`}>
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Select an Option
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDownComponent

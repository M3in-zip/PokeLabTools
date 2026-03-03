import React, { useState } from "react";

interface itemData {
  value: string;
  item: React.ReactNode;
}

interface InputSearchProps {
  onSelect: (onSelect: string | number) => void;
  dataSource: itemData[];
  defaultValue?: string;
}

export const InputSearch = ({ onSelect, dataSource, defaultValue }: InputSearchProps) => {
    const [listVisible, setListVisible] = useState<boolean>(false);
    const [start, setStart] = useState<string>(defaultValue || "");

    return (
        <div className="flex flex-col p-2 relative">
              <div className="flex flex-row items-center gap-2 mb-2">
                <input
                  className="border-2 border-white rounded-lg focus:outline-none focus:ring-0 p-1"
                  type="text"
                  placeholder="Search item"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  onFocus={() => setListVisible(true)}
                  onBlur={() => setListVisible(false)}
                />
              </div>
              {listVisible && (
                  <div/>
              )}
            </div>
    )
}
import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {

  // ******************** To Generate Random Password ********************************************
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");

// ======= useCallback for callback function ======== 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "0123456789";
    if (charsAllowed) str += "~!@#$%^&*()-_=+[{]}|;:,<.>/? ";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charsAllowed, setPassword]);

  // =========== useEffect for calling useCallback ================
  useEffect(() => {
    passwordGenerator();
  }, [length, setCharsAllowed, setNumbersAllowed, passwordGenerator]);

  // ========== useRef for reference used in copy =====
  const passwordRef = useRef(null)
   
  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select() //? is used because value can be null also
    passwordRef.current?.setSelectionRange(0,22)//used to selection range of characters
    window.navigator.clipboard.writeText(password)
  },[password])



// ******************************** For making ui ************************************************
  return (
    <>
      <div className="max-w-max w-full mx-auto bg-gray-700 px-4 my-8 rounded-lg shadow-md">
        <h3 className="text-3xl text-white font-bold px-4 py-2 text-center">
          Password Generator
        </h3>
        <div className="py-3 mb-4 flex">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="w-full outline-none bg-amber-50 rounded-l-lg px-2 py-2 font-semibold"
            ref={passwordRef}
            readOnly
          />
          <button
          className="bg-blue-600 px-2 rounded-r-lg text-white shrink-0 cursor-pointer"
          onClick={copyToClipboard}//to copy to clipboard function is called
          >
            Copy
          </button>
        </div>
        {/* Range */}
        <div className="flex flex-wrap gap-x-2 pb-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              min={6}
              max={20}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-orange-500">Length: {length}</label>
          </div>
          {/* /Checkboxes */}
          <div className="flex items-center">
            <input
              defaultChecked={numbersAllowed}
              type="checkbox"
              name="numberInput"
              id="numberInput"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label className="px-1 text-orange-500">Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              defaultChecked={charsAllowed}
              type="checkbox"
              name="specialCharacter"
              id="specialCharacter"
              onChange={() => {
                setCharsAllowed((prev) => !prev);
              }}
            />
            <label className="px-1 text-orange-500">SpecialCharacter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

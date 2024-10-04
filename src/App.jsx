import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  
  const [length, setLength] = useState(7);
  const [isNumberAllow, setIsNumberAllow] = useState(false);
  const [isCharAllow, setIsCharAllow] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const passwordRef = useRef(null);

  const copyPasswordOnClipBoard = useCallback(() => {
    
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,39)

    window.navigator.clipboard.writeText(passwordValue);

  },[passwordValue])


  // TODO: Implement password generation
  const generatePassword = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNumberAllow) str += "0123456789"
    if(isCharAllow) str += "!@#$%^&*"

    for(let i = 1; i<= length; i++){

      let charIndex = Math.floor(Math.random() * str.length + 1);
      console.log(charIndex);
      pass += str.charAt(charIndex);


    }

    setPasswordValue(pass);

  },[length, isNumberAllow, isCharAllow, setPasswordValue])

  useEffect(() => {
    generatePassword();
  },[length, isNumberAllow, isCharAllow,generatePassword])


  return (
    <>
      <div className="flex flex-col items-center max-w-lg mx-auto p-5 my-24 bg-slate-400 rounded-xl text-slate-100 space-y-6">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 text-transparent bg-clip-text">Password Generator</h1>

        {/* First part here: Input and Copy button */}
        <div className="flex items-center gap-4">
          <input 
            type="text"
            className="bg-slate-800 flex-grow p-2 w-80 font-semibold rounded-xl text-slate-100 focus:outline-none" 
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordOnClipBoard}
            className="bg-slate-800 p-2 px-4 rounded-xl text-slate-100 hover:bg-slate-600  hover:text-slate-950 hover:font-black hover:shadow-orange-400 hover:shadow-2xl"
            
          >
            Copy
          </button>
        </div>

        {/* Second part: Controls for length, number, and character allowance */}
        <div className="flex gap-4">

          {/* Length slider */}
          <div className="flex ">
            <input 
              type="range"
              className="w-40 bg-slate-800 mt-1 size-5 cursor-pointer"
              max={30}
              min={7}
              defaultValue={length}
              onChange={(e) => setLength(e.target.value)}
              
            />
            <label className="text-slate-100 ml-2  mb-1" >Length{" (" +length+")"}</label>
          </div>

          {/* Number checkbox */}
          <div className="flex items-center justify-between">
            <label className="text-slate-100">Number</label>
            <input 
              type="checkbox"
              className="bg-slate-800 rounded size-5 text-slate-100 focus:outline-none cursor-pointer"
              checked={isNumberAllow}
              onChange={() => setIsNumberAllow(isNumberAllow => !isNumberAllow)}
            />
          </div>

          {/* Character checkbox */}
          <div className="flex items-center justify-between">
            <label className="text-slate-100">Characters</label>
            <input 
              type="checkbox"
              className="bg-slate-800 rounded size-5 text-slate-100 focus:outline-none cursor-pointer"
              checked={isCharAllow}
              onChange={() => setIsCharAllow(isCharAllow => !isCharAllow)}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default App;

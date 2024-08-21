export function ButtonComponent({label,onClick}) {
    return(
        <div className="w-full flex justify-center">
         <button onClick={onClick} className="font-bold text-2xl rounded-lg text-white bg-black m-3 w-full p-2 hover:bg-gray-800 ">
           {label}
         </button>
        </div>
    )
}
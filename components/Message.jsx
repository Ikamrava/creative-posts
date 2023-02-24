import Avatar from "react-avatar"


function Message({children,avatar,username,description}) {
  return (
    <div className=" bg-white p-4 border-2 shadow-lg rounded-lg mt-5 font-Roboto ">
        <div className=" flex gap-2 items-center font-Poppins">
        <Avatar size={42} round={true} name={username} src={avatar}/>
        <h2 className=" text-sm font-Poppins">{username}</h2>
        </div>
        <div className=" my-5">
            <p className=" first-letter:capitalize font-Roboto text-md">{description}</p>
        </div>
     {children}
    </div>
  )
}

export default Message
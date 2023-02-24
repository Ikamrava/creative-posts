import Avatar from "react-avatar"


function Message({children,avatar,username,description}) {
  return (
    <div className=" bg-white p-4 border-2 shadow-lg rounded-lg ">
        <div className=" flex gap-2 items-center">
        <Avatar size={42} round={true} name={username} src={avatar}/>
        <h2 className=" text-sm">{username}</h2>
        </div>
        <div className=" my-5">
            <p className=" font-Poppins first-letter:capitalize">{description}</p>
        </div>
     {children}
    </div>
  )
}

export default Message
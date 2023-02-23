import Link from "next/link"

const Nav = () => {
  return (
    <nav className=" flex justify-between items-center py-10">
      <Link href="/">
      <button className=" text-lg font-medium">Creative Posts</button>
      </Link>
      <ul className=" flex items-center gap-10">
        <Link href="/auth/login" className=" py-2 text-sm bg-cyan-500 px-2 rounded-lg text-white font-medium">Join Now
        </Link>
      </ul>

    </nav>
  )
}

export default Nav

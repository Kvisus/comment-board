import Nav from './Nav'

export default function layout({children}) {
  return (
    <div className="">
      <Nav/>
      {/* pages */}
      <main>{children}</main>
    </div>
  )
};

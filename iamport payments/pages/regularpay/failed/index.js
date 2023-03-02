import Link from "next/link";

const failed = ()=>{
return(<>
<div>payment failed. try again please</div>
<Link href={'/regularpay'}><button>Go back to previous page to try again</button></Link>
</>)

};

export default failed;
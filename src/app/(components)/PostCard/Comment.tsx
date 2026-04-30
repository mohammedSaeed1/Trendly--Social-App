import Link from "next/link";

export default function Comment({postId} :{postId : string}) {
       
    return (
        <>  
        <Link href={`/posts/${postId}`}>
            <i  className="fa-regular fa-comment cursor-pointer"></i>
            </Link>
        </>
    )
}

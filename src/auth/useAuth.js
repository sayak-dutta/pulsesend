import Loader from "@/app/components/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const session = useSession()
    const router = useRouter()
    useEffect(()=>{
        if(session.status==='unauthenticated'){
            router.replace('/login')
        }
    },[session])
    if(session.status==='loading' || session.status==='unauthenticated'){
        return <Loader/>;
    }
    if(session.status==='authenticated'){
      return <WrappedComponent {...props} />
    }
  }

  return Auth
}

export const withUnAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter()
    const session = useSession()
    useEffect(()=>{
        if(session.status==='authenticated'){
            router.replace('/dashboard')
        }
    },[session])
    if(session.status==='loading' || session.status ==='authenticated'){
      return <Loader/>
    }

    return <WrappedComponent {...props} />
  }

  return Auth
}
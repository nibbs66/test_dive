import useSWR from "swr";

import {useSession} from "next-auth/react";
import {useEffect, useState} from 'react'
import {fetcher} from "../../../components/helper/fetcher";

export default function useEmployee () {

    const{data: session, status} = useSession()
    const id = session?.id
    const {data: user, error, isValidating, mutate} = useSWR(id && `/api/users/`+id, fetcher)

    return {
        user,
        error,
        isValidating
    }
}

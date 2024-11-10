import { useState, useEffect } from "react";
import UsersService from "../services/Users.service";

export function useMyUser() {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
        UsersService.getUserName()
            .then((response) => {
                setUser(response.data.results[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);
    return { user, loading, error };
}

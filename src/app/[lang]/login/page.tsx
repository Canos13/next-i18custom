// En tu archivo de login, por ejemplo: pages/login.tsx
/* "use client"
import { useState } from 'react'; */
/* import { useRouter } from 'next/navigation' */
/* import axios from 'axios'; */
import { useTranslations } from 'next-intl';

export default function LoginPage() {
    /* const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); */
   /*  const router = useRouter(); */
    const t = useTranslations('IndexPage');

    /* const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            document.cookie = `token=${response.data.token}; path=/; HttpOnly`;
            router.push('/dashboard');
        } catch (error) {
            console.error('Error logging in', error);
            // Manejar error de login
        }
    }; */

    return (
        <form /* onSubmit={handleLogin} */>
            {/* <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button> */}
            <h1 className='text-4xl mb-4 font-semibold'>{t('title')}</h1>
			<p>{t('description')}</p>
        </form>
    );
}

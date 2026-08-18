'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);

    try {
      await axios.post('http://localhost:8080/login', {
        username: form.get('username'),
        password: form.get('password'),
      }, { withCredentials: true });
      router.push('/dashboard');
    } catch {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-24 text-slate-900">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Đăng nhập</h1>
        <input name="username" required placeholder="Tên đăng nhập" className="rounded border p-3" />
        <input name="password" required type="password" placeholder="Mật khẩu" className="rounded border p-3" />
        {error && <p className="text-red-600">{error}</p>}
        <button disabled={loading} className="rounded bg-slate-900 p-3 text-white disabled:opacity-50">
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <Link href="/register" className="text-blue-700">Chưa có tài khoản? Đăng ký</Link>
      </form>
    </main>
  );
}

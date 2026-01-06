import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShieldCheck, AlertCircle, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const { setTokens, setUser } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.login({ email, password });
            setTokens(
                response.data.tokens.access_token,
                response.data.tokens.refresh_token
            );
            setUser(response.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6 shadow-2xl border border-white/20">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold mb-4 leading-tight">
                            Welcome to<br />
                            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                OneQlick Admin
                            </span>
                        </h1>
                        <p className="text-xl text-purple-100 leading-relaxed max-w-md">
                            Manage your food delivery platform with powerful tools and real-time insights.
                        </p>
                    </div>

                    <div className="space-y-6 max-w-md">
                        <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-purple-200" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Real-time Analytics</h3>
                                <p className="text-sm text-purple-100">Track orders, revenue, and performance metrics instantly.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-purple-200" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Secure & Reliable</h3>
                                <p className="text-sm text-purple-100">Enterprise-grade security for your business data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">OneQlick Admin</h1>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                        {/* Header */}
                        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-slate-50 to-white">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
                            <p className="text-slate-600">Enter your credentials to access the admin panel</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-8 pb-8 pt-6">
                            {error && (
                                <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-5">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@oneqlick.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                                            Password
                                        </Label>
                                        <a
                                            href="/forgot-password"
                                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                        >
                                            Forgot?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                                            autoComplete="current-password"
                                        />
                                    </div>
                                </div>

                                {/* Demo Credentials */}
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mt-0.5">
                                            <ShieldCheck className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-indigo-900 mb-2 uppercase tracking-wide">Demo Credentials</p>
                                            <div className="space-y-1">
                                                <p className="text-sm text-indigo-700 font-mono">taha@oneqlick.com</p>
                                                <p className="text-sm text-indigo-700 font-mono">Admin@123</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Footer */}
                            <p className="text-xs text-center text-slate-500 mt-6">
                                By signing in, you agree to our{' '}
                                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                    Terms
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                    Privacy Policy
                                </a>
                            </p>
                        </form>
                    </div>

                    {/* Copyright */}
                    <p className="text-center text-sm text-slate-500 mt-8">
                        © 2026 OneQlick. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

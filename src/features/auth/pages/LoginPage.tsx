import { useAuthStore } from '@/store/authStore';
// import { login } from '@/api/auth.api'; // Uncomment when using real API
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShieldCheck } from 'lucide-react';

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
            // Demo login - works without backend
            if (email === 'admin@oneqlick.com' && password === 'admin123') {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock response data
                const mockResponse = {
                    access_token: 'demo_access_token_' + Date.now(),
                    refresh_token: 'demo_refresh_token_' + Date.now(),
                    user: {
                        user_id: 'demo-user-id',
                        email: email,
                        first_name: 'Admin',
                        last_name: 'User',
                        role: 'admin',
                        profile_image: undefined,
                    },
                };

                // Save tokens and user data
                setTokens(mockResponse.access_token, mockResponse.refresh_token);
                setUser(mockResponse.user);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                // Wrong credentials
                setError('Invalid email or password. Use: admin@oneqlick.com / admin123');
            }

            // Uncomment below to use real API when backend is ready:
            // const response = await login({ email, password });
            // setTokens(response.access_token, response.refresh_token);
            // setUser(response.user);
            // navigate('/dashboard');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">OneQlick Admin</h1>
                    <p className="text-gray-600">Sign in to manage your platform</p>
                </div>

                {/* Login Card */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access the admin panel
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@oneqlick.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="/forgot-password"
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="h-11"
                                />
                            </div>

                            {/* Demo Credentials */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-xs font-semibold text-blue-900 mb-1">Demo Credentials:</p>
                                <p className="text-xs text-blue-700">Email: admin@oneqlick.com</p>
                                <p className="text-xs text-blue-700">Password: admin123</p>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>

                            <p className="text-xs text-center text-gray-500">
                                By signing in, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </CardFooter>
                    </form>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2026 OneQlick. All rights reserved.
                </p>
            </div>
        </div>
    );
}

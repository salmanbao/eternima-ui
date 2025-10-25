
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom brand colors
				brand: {
					primary: "#cb9b32",
					secondary: "#6b5420",
					tertiary: "#d1c8a9",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'typewriter': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'slide-up': {
					'from': { opacity: '0', transform: 'translateY(30px)' },
					'to': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-left': {
					'from': { opacity: '0', transform: 'translateX(-50px)' },
					'to': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'from': { opacity: '0', transform: 'translateX(50px)' },
					'to': { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in-bounce': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'50%': { transform: 'scale(1.1)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'draw-line': {
					'to': { strokeDashoffset: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(203, 155, 50, 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(203, 155, 50, 0.6)',
						transform: 'scale(1.05)'
					}
				},
				'fill-star': {
					'from': { fill: 'transparent' },
					'to': { fill: 'currentColor' }
				},
				'rotate-y-180': {
					'from': { transform: 'rotateY(0deg)' },
					'to': { transform: 'rotateY(180deg)' }
				},
				'parallax-scroll': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-20%)' }
				},
				'zoom-in': {
					'from': { transform: 'scale(0.95)', opacity: '0' },
					'to': { transform: 'scale(1)', opacity: '1' }
				},
				'zoom-out': {
					'from': { transform: 'scale(1.05)', opacity: '0' },
					'to': { transform: 'scale(1)', opacity: '1' }
				},
				'blur-in': {
					'from': { filter: 'blur(10px)', opacity: '0' },
					'to': { filter: 'blur(0)', opacity: '1' }
				},
				'slide-rotate': {
					'from': { transform: 'translateX(-100px) rotate(-10deg)', opacity: '0' },
					'to': { transform: 'translateX(0) rotate(0deg)', opacity: '1' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.3)', opacity: '0' },
					'50%': { transform: 'scale(1.05)', opacity: '1' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)' }
				},
				'gradient-x': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'gradient-y': {
					'0%, 100%': { backgroundPosition: '50% 0%' },
					'50%': { backgroundPosition: '50% 100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
				'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'typewriter': 'typewriter 3s steps(40) forwards',
				'slide-up': 'slide-up 0.6s ease-out forwards',
				'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
				'scale-in-bounce': 'scale-in-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'draw-line': 'draw-line 1.5s ease-out forwards',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'fill-star': 'fill-star 0.3s ease-out forwards',
				'rotate-y-180': 'rotate-y-180 0.7s ease-out',
				'parallax-scroll': 'parallax-scroll 1s linear infinite',
				'zoom-in': 'zoom-in 0.8s ease-out forwards',
				'zoom-out': 'zoom-out 0.8s ease-out forwards',
				'blur-in': 'blur-in 0.8s ease-out forwards',
				'slide-rotate': 'slide-rotate 0.8s ease-out forwards',
				'bounce-in': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'gradient-x': 'gradient-x 3s ease infinite',
				'gradient-y': 'gradient-y 3s ease infinite'
			},
			backgroundImage: {
				'brand-gradient': 'linear-gradient(135deg, #cb9b32 0%, #6b5420 100%)',
				'brand-gradient-soft': 'linear-gradient(180deg, #d1c8a9 0%, #ffffff 100%)',
			},
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
				'display': ['Brockmann', 'SF Pro Display', 'Inter', 'sans-serif'],
				'brockmann': ['Brockmann', 'serif'],
				'playfair': ['"Playfair Display"', 'serif'],
			},
			boxShadow: {
				'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

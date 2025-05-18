import React from 'react';

// Simple motion utility (minimal implementation of framer-motion-like API)
// In a real app, you'd use framer-motion or another animation library

interface MotionProps {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

export const motion = {
  div: React.forwardRef<HTMLDivElement, MotionProps & React.HTMLAttributes<HTMLDivElement>>(
    ({ initial, animate, exit, transition, className, children, ...props }, ref) => {
      const [isAnimating, setIsAnimating] = React.useState(false);
      
      React.useEffect(() => {
        // Start animation after initial render
        setIsAnimating(true);
      }, []);

      // Create CSS transition string from transition object
      const createTransition = () => {
        if (!transition) return '';
        const { duration = 0.3, delay = 0, ease = 'ease' } = transition;
        return `all ${duration}s ${ease} ${delay}s`;
      };

      // Create style object from initial and animate objects
      const style: React.CSSProperties = {
        transition: createTransition(),
        ...(isAnimating ? animate : initial),
      };

      return (
        <div ref={ref} className={className} style={style} {...props}>{children}</div>
      );
    }
  ),
};
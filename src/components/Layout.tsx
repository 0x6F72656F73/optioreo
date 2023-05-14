import { Box } from "@chakra-ui/react";

interface LayoutProps {
children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Box p={4}>
        {children}
        </Box>
    );
};

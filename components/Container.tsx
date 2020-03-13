import { NextPage } from 'next';

interface ContainerProps {
    children: any;
}

const Container: NextPage<ContainerProps> = ({
    children
}) => {
    return (
        <div className="max-w-4xl mx-auto px-6 md:px-8">
            {children}
        </div>
    )
}

export default Container;
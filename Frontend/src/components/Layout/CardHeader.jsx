import Button from '../Ui/Button';

function CardHeader({ cardHeading, headingDescription, buttonText, showButton = true, ...props }) {
    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    {cardHeading}
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    {headingDescription}
                </p>
            </div>

            {showButton && buttonText ? (
                <Button
                    {...props}
                    buttonClass="w-full md:w-auto px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-semibold"
                >
                    {buttonText}
                </Button>
            ) : null}
        </div>
    )
}

export default CardHeader;

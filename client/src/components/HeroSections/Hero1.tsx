interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  altText: string;
}

const Hero1 = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageUrl,
  altText,
}: HeroSectionProps) => {
  return (
    <div className="w-full  py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-semibold text-gray-8 leading-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-6 mb-6">{subtitle}</p>
          <a
            href={buttonLink}
            className="inline-block px-6 py-2 text-lg font-medium text-white bg-slate-95 rounded-md hover:bg-slate-8 transition duration-300"
          >
            {buttonText}
          </a>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto object-cover rounded-lg "
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;

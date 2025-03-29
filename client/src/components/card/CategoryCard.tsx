export const CategoryCard = ({ img, name }: { img: string; name: string }) => {
  return (
    <div className="flex flex-col items-center p-4  rounded-lg">
      <div className="w-50 h-50 rounded-full border-4 border-dotted border-orange-3 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110">
        <img
          src={img}
          alt={name}
          className="w-44 h-44 rounded-full object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-center">{name}</p>
    </div>
  );
};

const ModalCard = ({ data }) => {
  const { key, type, description, address } = data;
  return (
    <div className="p-4 w-96 !fixed bottom-10 -translate-x-[50%] -translate-y-6">
      <div className="h-full border-2 bg-white border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src="https://dummyimage.com/720x400"
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {type}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {key}
            <p className="leading-relaxed mb-3 text-gray-400 text-xs ">
              {address}
            </p>
          </h1>
          <p className="leading-relaxed mb-3 text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;

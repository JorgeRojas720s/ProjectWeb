const renderTitle = (plural, singular, items) => {
    return (
      <div className="text-purple-1 font-semibold">
        {items && items.length > 1 ? plural : singular}
        :
      </div>
    );
  };

  const renderItems = (items, postFix, numerable) => {
    return (
      <div>
        {items && items.length > 0 ? (
          items.map((obj, index) => (
            <p key={index} className="ml-4">{`${numerable? index + 1 + '.':''} ${obj[postFix]}`}</p>
          ))
        ) : (
          <p className="ml-4">{`${
            items && items[postFix] != undefined ? items[postFix] : "No tiene"
          }`}</p>
        )}
      </div>
    );
  };

  const callRenderTitleDescription = (plural, singular, items, postFix, numerable, className) => {
    return (
      <div className={`${className? className: 'flex flex-col'}`}>
        {renderTitle(plural, singular, items)}
        {renderItems(items, postFix, numerable)}
      </div>
    );
  };

  export {
    renderItems, 
    renderTitle, 
    callRenderTitleDescription
  }
const renderTitle = (plural, singular, items) => {
    return (
      <div className="text-purple-1 font-semibold">
        {items.length > 1 ? plural : singular}:
      </div>
    );
  };

  const renderItems = (items, postFix) => {
    return (
      <div>
        {items.length > 0 ? (
          items.map((obj, index) => (
            <p key={index} className="ml-4">{`${index + 1}. ${obj[postFix]}`}</p>
          ))
        ) : (
          <p className="ml-4">{`${
            items[postFix] != undefined ? items[postFix] : "No tiene"
          }`}</p>
        )}
      </div>
    );
  };

  const callRenderTitleDescription = (plural, singular, items, postFix) => {
    return (
      <div>
        {renderTitle(plural, singular, items)}
        {renderItems(items, postFix)}
      </div>
    );
  };

  export {
    renderItems, 
    renderTitle, 
    callRenderTitleDescription
  }
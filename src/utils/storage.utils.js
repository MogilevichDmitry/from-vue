const STORAGE_KEY = "columns und rows";
const TITLESTORAGE_KEY = "QuestionTitle";

const localeStore = {
  fetch: function() {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localeStore.uid = items.length;
    return items;
  },
  save: function(cols) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cols));
  }
};

const titleStorage = {
  fetch: function() {
    if (localStorage.getItem(TITLESTORAGE_KEY)) {
      return JSON.parse(localStorage.getItem(TITLESTORAGE_KEY)) || '';
    } else {
      return '';
    }
    
  },
  save: function(title) {
    localStorage.setItem(TITLESTORAGE_KEY, JSON.stringify(title));
  }
}; 

export { titleStorage, localeStore };

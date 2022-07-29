export function ReadingListDropDown({
  readingListData,
  handleChange,
  readingListSelection,
}) {
  return (
    readingListData?.length > 0 && (
      <select
        value={readingListSelection}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <option hidden value="">
          Please Select a list
        </option>
        {readingListData?.map((arr) => {
          return (
            <option
              key={arr.reading_list_id}
              id={arr.reading_list_id}
              value={arr.reading_list_name}
            >
              {arr.reading_list_name}
            </option>
          );
        })}
      </select>
    )
  );
}

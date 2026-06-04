import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAirlineList, setFavorite } from './airlinesService';

const PAGE_SIZE_OPTIONS = [5, 10, 25, 100];

function AirlinesList({ country }) {
  const [airlines, setAirlines] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const loadAirlines = useCallback(async () => {
    try {
      const data = await getAirlineList(country);
      setAirlines(data);
      setPageIndex(0);
    } catch {
      setAirlines([]);
      setPageIndex(0);
    }
  }, [country]);

  useEffect(() => {
    loadAirlines();
  }, [loadAirlines]);

  const pageCount = Math.max(1, Math.ceil(airlines.length / pageSize));
  const safePageIndex = Math.min(pageIndex, pageCount - 1);

  const pageRows = useMemo(() => {
    const start = safePageIndex * pageSize;
    return airlines.slice(start, start + pageSize);
  }, [airlines, safePageIndex, pageSize]);

  async function toggleFavorite(id, favorite) {
    try {
      await setFavorite(id, favorite);
      await loadAirlines();
    } catch {
      // errors logged in service
    }
  }

  function goToPage(nextIndex) {
    setPageIndex(Math.max(0, Math.min(nextIndex, pageCount - 1)));
  }

  return (
    <div className="airlines-list">
      <table>
        <thead>
          <tr>
            <th aria-label="Favorite" />
            <th>ID</th>
            <th>Name</th>
            <th>IATA</th>
            <th>ICAO</th>
            <th>Callsign</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row) => (
            <tr key={row.id}>
              <td>
                <button
                  type="button"
                  className="favorite-button"
                  aria-label={row.favorite ? 'Remove favorite' : 'Add favorite'}
                  onClick={() => toggleFavorite(row.id, !row.favorite)}
                >
                  {row.favorite ? '♥' : '♡'}
                </button>
              </td>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.iata}</td>
              <td>{row.icao}</td>
              <td>{row.callsign}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginator">
        <label>
          Page size
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span>
          {airlines.length === 0
            ? '0 of 0'
            : `${safePageIndex * pageSize + 1}–${Math.min(
                (safePageIndex + 1) * pageSize,
                airlines.length
              )} of ${airlines.length}`}
        </span>
        <button type="button" disabled={safePageIndex === 0} onClick={() => goToPage(0)}>
          First
        </button>
        <button
          type="button"
          disabled={safePageIndex === 0}
          onClick={() => goToPage(safePageIndex - 1)}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={safePageIndex >= pageCount - 1}
          onClick={() => goToPage(safePageIndex + 1)}
        >
          Next
        </button>
        <button
          type="button"
          disabled={safePageIndex >= pageCount - 1}
          onClick={() => goToPage(pageCount - 1)}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default AirlinesList;

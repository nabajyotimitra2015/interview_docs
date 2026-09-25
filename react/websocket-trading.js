const bufferRef = useRef(new Map());

useEffect(() => {
  const socket = new WebSocket("wss://example.com/market-data");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Don't update React state yet
    bufferRef.current.set(data.symbol, data);
  };

  const interval = setInterval(() => {
    if (bufferRef.current.size === 0) return;

    const updates = Array.from(bufferRef.current.values());

    bufferRef.current.clear();

    setMarketData((prev) => {
      const next = { ...prev };

      updates.forEach((item) => {
        next[item.symbol] = item;
      });

      return next;
    });
  }, 50);

  return () => {
    clearInterval(interval);
    socket.close();
  };
}, []);

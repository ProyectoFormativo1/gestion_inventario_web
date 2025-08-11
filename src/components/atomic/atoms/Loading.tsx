import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <Spinner labelColor="primary" label="Cargando..."  size="md" className="m-4" classNames={{label: "text-foreground mt-4"}}  />
  );
  };
  
  export default Loading;
  
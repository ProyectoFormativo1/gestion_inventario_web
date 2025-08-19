import {Spinner} from "@heroui/spinner";
const Loading = () => {
  return (
    <Spinner variant="wave" labelColor="primary" label="Cargando..."  size="md" className="m-4" classNames={{label: "text-foreground mt-4"}}  />
  );
  };
  
  export default Loading;
  
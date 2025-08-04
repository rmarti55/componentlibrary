import { COMPONENT_MAP, ComponentDefinition } from './TrustedComponentMap'

const normalizeDefinition = (def: any) => {
  let props = def.props ?? {};

  if (typeof props === "string") {
    try {
      props = JSON.parse(props);
    } catch (err) {
      console.error("Failed to parse props JSON:", err);
      props = {};
    }
  }

  return {
    type: def.type,
    props,
  };
};

export const DynamicComponentRenderer = ({ definition }: { definition: any }) => {
  const { type, props } = normalizeDefinition(definition);

  console.log("Rendering type:", type);
  console.log("Parsed props:", props);

  const Component = COMPONENT_MAP[type];

  if (!Component) return <div>Unknown component: {type}</div>;

  return <Component {...props} />;
}; 
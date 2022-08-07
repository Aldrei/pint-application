import { compact, findLast, isArray, isElement, isObject } from 'lodash';
import React from 'react';

interface IRenderRecordEntry {
  name: string;
  props: Record<string, unknown>;
}

interface IRenderRecordProps {
  _mockId: number;
  _name: string;
}

let renderRecords: Array<IRenderRecordEntry> = [];
let mockId = 0;

/**
 * TODO: remove this...
*/
console.log({ mockId });

function saveRenderRecord(name: string, props: Record<string, unknown>): IRenderRecordProps {
  mockId += 1;
  renderRecords[mockId] = { name, props };
  return { _mockId: mockId, _name: name };
}

function clearRenderRecords(): void {
  mockId = 0;
  renderRecords = [];
}

// eslint-disable-next-line @typescript-eslint/ban-types
function propSnapshot(props: {} | Record<string, unknown>): Record<string, unknown> {
  const { style, ...restProps } = props as Record<string, unknown>;
  const result: Record<string, unknown> = { _style: style, ...restProps };
  Object.entries(result).forEach(([key, value]) => {
    if (isElement(value)) {
      const element = value as HTMLElement;
      const attrList = element
        .getAttributeNames()
        .map(attr => `${attr}='${element.getAttribute(attr) || ''}'`)
        .join(' ');

      // Generates the string representation of the HTML element in the format:
      //   - <img /> (without any attributes)
      //   - <div class='lorem' id='ipsum' /> (with attribute list)
      const strElement = compact([`<${element.tagName.toLowerCase()}`, attrList, '/>']).join(' ');

      result[key] = strElement;
    } else if (isArray(value) || isObject(value)) {
      result[key] = JSON.stringify(value);
    }
  });
  return result;
}

/**
 * Retrieves a mock render record by its mock id.
 */
export function getRenderRecordById(id: number): IRenderRecordEntry | undefined {
  return renderRecords[id];
}

/**
 * Retrieves a mock render record by the component name.
 * If multiple instances are found, only the last render record is returned.
 */
export function getRenderRecordByName(name: string): IRenderRecordEntry | undefined {
  return findLast(renderRecords, ['name', name]);
}

/**
 * Provides a shallow component mock. This prevents the rendering of the entire subtree,
 * similar to what Enzyme's shallow rendering does.
 */
export const mockShallow = (name: string): React.FC => {
  const MockShallow: React.FC = (props): React.ReactElement => {
    const recordProps = saveRenderRecord(name, props);
    const { children, ...restProps } = props as Record<string, unknown>;
    return <mock-shallow {...recordProps} _children={children} {...propSnapshot(restProps)} />;
  };
  return MockShallow;
}

/**
 * Provides a pass-through component mock which renders its children but skips the
 * original component rendering process. This is useful for cases where the component
 * is a container which performs undesired side-effects in a test.
 */
export function mockPassthru(name: string): React.FC {
  const MockPassthru: React.FC = (props): React.ReactElement => {
    const recordProps = saveRenderRecord(name, props);
    const { children, ...restProps } = props as Record<string, unknown>;
    return (
      <mock-passthru {...recordProps} {...propSnapshot(restProps)}>
        {children}
      </mock-passthru>
    );
  };
  return MockPassthru;
}

/**
 * Provides a gate component mock, which takes a condition function to determine whether
 * to render the component children or not based on the received props.
 * This is useful for mocking certain components that renders children conditionally,
 * such as Material UI's "Hidden" and "Popper" components.
 */
export function mockGate<T>(name: string, condition: (props: T) => boolean): React.FC<T> {
  const MockGate: React.FC<T> = (props): React.ReactElement => {
    const recordProps = saveRenderRecord(name, props as Record<string, unknown>);
    const { children, ...restProps } = props as Record<string, unknown>;
    const isOpen = condition(props);
    return (
      <mock-gate {...recordProps} _children={children} {...propSnapshot(restProps)}>
        {isOpen && children}
      </mock-gate>
    );
  };
  return MockGate;
}

// Use Jest hook to clear render records after each test execution
afterEach(clearRenderRecords);
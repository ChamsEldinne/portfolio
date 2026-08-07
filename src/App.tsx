import { useState , useRef  } from 'react';
import './App.css'  ;
import treeData, { type TreeNode } from './treeData.tsx'  ;
import MainHeader from './MainHeader.tsx';


 
const TreeBranch = ({
  node,
  prefix,
  isLast,
}: {
  node: TreeNode;
  prefix: string;
  isLast: boolean;
}) => {
  const isFolder = node.type === "folder";
  const connector = isLast ? "└── " : "├── ";
  const children = node.children ?? [];
  const childPrefix = prefix + (isLast ? "    " : "│   ");
 
  return (
    <>
      <div>
        <span className="text-zinc-600">{prefix}{connector}</span>
        <span className={isFolder ? "text-brand-blue" : "text-white"}>
          {node.name}
          {isFolder ? "/" : ""}
        </span>
      </div>
      {children.map((child, index) => (
        <TreeBranch
          key={child.id}
          node={child}
          prefix={childPrefix}
          isLast={index === children.length - 1}
        />
      ))}
    </>
  );
};
 
const TreeView = ({ root }: { root: TreeNode }) => {
  const children = root.children ?? [];
  return (
    <div className="font-mono text-sm leading-relaxed">
      <div className="text-brand-green">{root.name}</div>
      {children.map((child, index) => (
        <TreeBranch
          key={child.id}
          node={child}
          prefix=""
          isLast={index === children.length - 1}
        />
      ))}
    </div>
  );
};
 

const HelpComponent = () => {

  const examples = (treeData.children ?? []).map((node) =>
    node.type === "folder" ? `cd ${node.name}` : `cat ${node.name}`
  );

  return (
    <div className="mt-4 text-white">
      {/* <p> */}
        Interactive terminal-styled portfolio built with React, TypeScript & Vite 
        — navigate projects with real shell commands (ll, cd, cat).
      {/* </p> */}
      <p>Available commands:</p>
      <ul className="list-disc list-inside">
        <li><span className="text-brand-green">ll</span> - List directory contents</li>
        <li><span className="text-brand-green">cd</span> - Change directory</li>
        <li><span className="text-brand-green">cat</span> - Display file contents</li>
        <li><span className="text-brand-green">help</span> - Show available commands</li>
        <li><span className="text-brand-green">clear</span> - Clear the terminal</li>
      </ul>

      <p className="mt-4 text-white ">Here's what's in here:</p>
      <TreeView root={treeData} />

      <p className="mt-4 text-white">
        New to the terminal? Try typing any of these:
      </p>
       <ul className="mt-1 list-none">
        <li>
          <span className="text-brand-yellow">$</span>{" "}
          <span className="text-brand-green">ll</span>
        </li>
        {examples.map((cmd) => (
          <li key={cmd}>
            <span className="text-brand-yellow">$</span>{" "}
            <span className="text-brand-green">{cmd}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} ;

interface Statment{
  command: string ,
  description: string ,
  fuction: (current:TreeNode , s : string | null ) => void
}


const ListChildren = ({children}: {children: TreeNode[]}) => {
  return children.map((child, index) => (
    <div key={index} className="text-white">
      {child.name}
    </div>
  ));
};


const CommandNotFound = ({cmd}: {cmd: string}) => {
  return (
    <div className="text-white">
      Command not found: {cmd}
    </div>
  );
}

const WrittenCommand = ({cmd , path}: {cmd: string, path: string}) => {
  return (
    <span className='text-white w-full flex gap-2 ' >
      <span  className='' >  
        <span  className='text-brand-green' >visitor@portfolio:
          <span className='text-brand-blue' >{path}</span>
        </span>$ 
      </span>
      <span  className="text-white" > {cmd} </span>
    </span>
  );
}


const Container = ({ children , cmd , path }: { children: React.ReactNode; cmd: string | null , path: string }) => {
  return (
    <>
      <WrittenCommand cmd={cmd || ""} path={path} />
      {children}
    </>
  )
}



const TooManyArguments = ({cmd}: {cmd: string | null}) => {
  return (
    <div className="text-white">
      Too many arguments for command: {cmd}
    </div>
  );
}

const NoSuchFileOrDirectory = ({cmd}: {cmd: string | null}) => {
  return (
    <div className="text-white">
      No such file or directory: {cmd}
    </div>
  );
}


const findeNodeByPath = (root: TreeNode, path: string[] ): TreeNode | null => {

  // if( path.length === 0){
  //   return root ;
  // }

  if(!root){
    return null ;
  }  

  for (let i = 0; i < path.length; i++) {
      for (let j = 0; j < (root?.children?.length ?? 0) ; j++) {
          if (root?.children?.[j].name === path[i]) {
              return findeNodeByPath(root.children![j], path.slice(i + 1));
          }
      }
      return null ;      
  }

  return root ;
}


function App() {
  
  const [conetent , setConetet] =  useState<React.JSX.Element[]>([<MainHeader />]) ;
  const [ history , setHistory ] = useState<string[]>([]) ;
  const [ , setHistoryIndex ] = useState<number>(-1) ;
  const [ currentNode , setCurrentNode ] =useState<TreeNode>(treeData) ;
  const [ currentPath , setCurrentPath ] = useState<string>("~") ;
  const [input , inputeChange] = useState<string>("") ;
  
  const inputRef = useRef<HTMLInputElement>(null);


  const statments :Statment[] = [
    {
      command: "ll",
      description: "List directory contents",
      fuction: (current : TreeNode , cmd : string | null ) => {

        const [_, ...args] = cmd?.split(' ') || [] ;
        
        if( args.length > 1){
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <TooManyArguments cmd={cmd} /> </Container>  ]) ;
          return ;
        }
        
        if( args[0] == null || args[0] == ""){
          setConetet(prev => [...prev ,<Container cmd={cmd} path={currentPath} >  <ListChildren children={current.children || []} /> </Container> ]) ;
          return ;
        }

        const startNode = args?.[0]?.startsWith('/') ? treeData : currentNode ;

        const directories  : string[]  = args[0]?.split('/')?.filter(s => s !== "") || [];
        
        const node = findeNodeByPath(startNode , directories) ;
        
        if( node && node.type === "folder" ){

          setConetet(prev => [...prev ,<Container cmd={cmd} path={currentPath} >  <ListChildren children={node.children || []} /> </Container> ]) ;

        }else {
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <NoSuchFileOrDirectory cmd={cmd} /> </Container>  ]) ;
        }
      }
    },
    {
      command: "cd",
      description: "Change directory",
      fuction: (_root : TreeNode  , cmd : string | null ) => {

        const [_, arg] = cmd?.split(' ') || [] ;

        if( arg == null || arg == ""){
          setCurrentNode(treeData) ;
          setCurrentPath("~") ;
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} >  </Container>  ]) ;   
          return ;
        }

        const startNode = arg.startsWith('/') ? treeData : currentNode ;

        const directories  : string[]  = arg?.split('/').filter(s => s !== ""); ;
        
        const node = findeNodeByPath(startNode , directories) ;

        if( node && node.type === "folder" ){
          setCurrentNode(node) ;
          setCurrentPath(arg) ;

         setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} >  </Container>  ]) ;   

        }else{
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <NoSuchFileOrDirectory cmd={cmd} /> </Container>  ]) ;
        }
      }
    },
    {
      command: "cat",
      description: "Display file contents",
      fuction: (currentNode : TreeNode , cmd : string | null) => {

        const [_, ...args] = cmd?.split(' ') || [] ;
        
        if( args.length > 1){
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <TooManyArguments cmd={cmd} /> </Container>  ]) ;
          return ;
        }
        
        if( args[0] == null || args[0] == ""){
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <NoSuchFileOrDirectory cmd={cmd} /> </Container>  ]) ;
          return ;
        }

        const startNode = args[0]?.startsWith('/') ? treeData : currentNode ;

        const directories  : string[]  = args[0]?.split('/')?.filter(s => s !== "") || [];
        
        const node = findeNodeByPath(startNode , directories) ;

        if( node && node.type === "file" ){
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <div className='text-white' > {node.content} </div> </Container>  ]) ;
        }else{
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <NoSuchFileOrDirectory cmd={cmd} /> </Container>  ]) ;
        }

      }
    },
    {
      command: "help",
      description: "Show available commands",
      fuction: (_root : TreeNode , cmd : string | null ) => {
        setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <HelpComponent /> </Container>  ]) ;
      }
    },
    {
      command: "clear",
      description: "Clear the terminal",
      fuction: (_root : TreeNode , _cmd : string | null ) => {
        setConetet([]) ;
        setCurrentNode(treeData) ;
        return ;
      }
    }
  ] ;


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHistoryIndex(-1) ;
    inputeChange(event.target.value) ;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = input.trim();
      setHistory(prev => [inputValue , ...prev  ]) ;
      const [cmd] = inputValue.split(' ');
      const statment = statments.find(s => s.command === cmd ) ;
      if(statment){
        statment.fuction(currentNode , inputValue) ;
      }else{
        setConetet(prev => [...prev , <Container cmd={inputValue} path={currentPath} > {inputValue === "" ? <></> : <CommandNotFound cmd={inputValue} />} </Container>  ]) ;
      }
      inputeChange("") ;
    } 

    if( event.key === 'ArrowUp') {
      setHistoryIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex < history.length) {
          inputeChange(history[newIndex]);
          return newIndex;
        }
        return prev; // No change if out of bounds
      });
    }else if (event.key === 'ArrowDown') {
      setHistoryIndex(prev => {
        const newIndex = prev - 1;
        if (newIndex >= 0) {
          inputeChange(history[newIndex]);
          return newIndex;
        }else{
          inputeChange("");
          return -1 ;
        }
        return prev; // No change if out of bounds
      });
    }
  }


  const handlePaste = async (event: React.MouseEvent) => {
    event.preventDefault(); // suppress the default right-click menu

    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;

      const el = inputRef.current;
      if (!el) return;

      const start = el.selectionStart ?? input.length;
      const end = el.selectionEnd ?? input.length;
      const newValue = input.slice(0, start) + text + input.slice(end);

      inputeChange(newValue);

      // restore caret right after the pasted text once React re-renders
      requestAnimationFrame(() => {
        el.focus();
        const pos = start + text.length;
        el.setSelectionRange(pos, pos);
      });
    } catch (err) {
      console.error("Clipboard read failed:", err);
    }
  };

  
  return (
    <section className="min-h-screen w-full bg-background p-2" 
      onClick={() => {
        const selection = window.getSelection();
        if (!selection || selection.toString() === "") {
          inputRef.current?.focus();
        }
      }} 
    >
      

      {
        conetent.map((node , index) => <div key={index}>{node}</div> )
      }

      <div>

        <span className='text-white w-full flex gap-2 ' >
          <span  className='' >  
            <span  className='text-brand-green' >visitor@portfolio:
              <span className='text-brand-blue' >{currentPath}</span>
            </span>$ 
          </span>
          <input  ref={inputRef} autoFocus={true} type="text" className='bg-background flex-1 w-full text-white outline-none border-none'
          value={input} onChange={handleInputChange} onKeyDown={handleKeyDown}
          onContextMenu={handlePaste}
        />
        </span>

      </div>
    </section>
  )
}



export default App
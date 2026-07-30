import { useState , useRef  } from 'react';
import './App.css'  ;
import treeData, { type TreeNode } from './treeData.tsx'  ;
import MainHeader from './MainHeader.tsx';


const HelpComponent = () => {
  return (
    <div className="mt-4 text-white text-lg">
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
          <span className='text-brand-blue' >/{path}</span>
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
        setConetet(prev => [...prev ,<Container cmd={cmd} path={currentPath} >  <ListChildren children={current.children || []} /> </Container> ]) ;
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
        }
        
        if( args[0] == null || args[0] == ""){
          setConetet(prev => [...prev , <Container cmd={cmd} path={currentPath} > <NoSuchFileOrDirectory cmd={cmd} /> </Container>  ]) ;
          return ;
        }

        const startNode = args[0].startsWith('/') ? treeData : currentNode ;

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
              <span className='text-brand-blue' >/{currentPath}</span>
            </span>$ 
          </span>
          <input  ref={inputRef} autoFocus={true} type="text" className='bg-background flex-1 w-full text-white outline-none border-none'
          value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        </span>

      </div>
    </section>
  )
}



export default App
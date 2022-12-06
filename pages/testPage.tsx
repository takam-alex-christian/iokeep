import React from 'react'

import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { faCheck, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons'




import { OptionList,NoteCard, OptionListProps, TagEditor, TagEditorProps } from '../components/ui/ui'

class TestPage extends React.Component {

  fakeMidOptions: OptionListProps = {
    list: [{
      text: 'My Notes',
      icon: faNoteSticky
    },
    {
      text: 'To-Do List',
      icon: faCheck
    }],
    rank: 'mid'
  };

  fakeBottomOptions: OptionListProps = {
    list: [{
      text: 'Add new folder',
      icon: faPlus
    },
    {
      text: 'Settings',
      icon: faGear
    }],
    rank: 'bottom'
  };

  fakeTagList: Array<String> = [
      "green",
      "red",
      "yellow",
      "star"
    ]
  

  constructor(props: any) {
    super(props)

  }



  render(): React.ReactNode {
    return (
      <div className={`flex flex-row h-screen overflow-clip`}>
        <nav className={`flex flex-col justify-between h-full w-[280px] p-4 `}>
          {/* top */}
          <div className='flex flex-col gap-6'>


            <button className={`p-4 bg-white rounded-lg w-full`}>
              <div className={`flex flex-row gap-8 items-center w-full justify-between`}>
                <div className={`flex flex-row gap-4 items-center`}>
                  <div>
                    {/* avatar image here */}
                    <Image src={'/AvatarMaker.svg'} width={48} height={48} alt={`Avatar`} className={`rounded-lg`} />
                  </div>
                  <div>
                    {/* user name */}
                    Guess
                  </div>
                </div>

                <div>
                  {/* arrow icon */}
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </button>

            <div className={`flex flex-row gap-4 items-center h-14 bg-white w-full rounded-lg px-4 focus-within:outline`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type={`text`} className={`h-full p-0 m-0 min-w-[136px] w-full hover:outline-none focus:outline-none`} placeholder={`Search notes...`} />
            </div>

          </div>

          {/* mid */}
          <div className={``}>
            <OptionList rank={`mid`} list={this.fakeMidOptions.list} />
          </div>

          <div>
            <OptionList rank={'bottom'} list={this.fakeBottomOptions.list} />
          </div>

        </nav>

        <main className={`bg-white flex flex-row gap-0 w-full`}>
          <div className={`flex flex-col gap-6 p-4 border-r border-slate-300`}>
            {/* code for notes list */}
            <div className={`min-h-[80px] flex items-center`}>
              <h1 className={`text-4xl`}>My Notes</h1>
            </div>

            <div>
              <button className={`flex flex-row gap-4 h-14 w-full items-center p-4 rounded-lg bg-[#F6F6F6]`}>
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                </div>

                <div>
                  Add new note
                </div>
              </button>
            </div>


            <div className={`flex flex-col gap-3 h-[calc(100vh-200px)] overflow-y-auto`}>
              {/* note navigator */}
              <NoteCard />
              <NoteCard />
              <NoteCard />
            </div>
          </div>

          <div className={`p-4 grow`}>
            {/* the rightmost section */}
            <header>
              <div className={`h-20 flex flex-row gap-4 items-center text-lg font-normal`}>
                <div>My Notes</div>
                <div><FontAwesomeIcon icon={faChevronRight} /></div>
                <div>the big title</div>
              </div>
            </header>
            <hr />
            <div className={`p-4`}>
              {/* information related to note */}
              <h1 className={`text-4xl font-medium`}>
                A very big placeholder title
              </h1>

              {/* <table >

                <tr>
                  <td>Create By: </td>
                  <td>Guess </td>
                </tr>
                <tr>
                  <td>Last Modified: </td>
                  <td>Mon 05 Dec 2022 At 06:11 PM</td>
                </tr>
                <tr>
                  <td>Tags: </td>
                  <td>
                    <TagEditor tagList={this.fakeTagList} />
                  </td>
                </tr>
              </table> */}

              <div className={`p-4`} style={{display: 'grid',gridTemplateColumns: '1fr 3fr', alignItems: 'center', rowGap: '16px'}}>
                <div>Created By</div>
                
                <div className={`flex flex-row gap-2`}>
                  <Image src={'/AvatarMaker.svg'} width={24} height={24} alt={`Avatar`} className={`rounded`} />
                  <p>
                    Guess
                  </p>
                </div>
                
                <div>Last Modified</div>
                <div>Mon 05 Dec 2022 At 06:11 PM</div>
                <div>Tags</div>
                <div ><TagEditor tagList={this.fakeTagList} /></div>
              </div>

  

            </div>
            <hr />
          </div>
        </main>

      </div>
    )
  }

}

export default TestPage
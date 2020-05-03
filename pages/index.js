import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import smoothscroll from 'smoothscroll-polyfill';

let cn = require('classnames');

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default () => {
  let [ scrollPos, setScrollPos ] = useState(0),
      router = useRouter(),
      prevScrollPos = usePrevious(scrollPos);

  useEffect(() => {
    smoothscroll.polyfill();
    document.addEventListener('scroll', onSetScrollPos)
    window.scrollTo(0,0)
    return(() => {
      document.removeEventListener('scroll', onSetScrollPos)
    })
  }, [])

  const onSetScrollPos = e => {
    let x = document.body.scrollTop || document.documentElement.scrollTop
    setScrollPos(x)
  }

  useEffect(() => {
    if (scrollPos < prevScrollPos) {
      document.getElementById('site-header').classList.remove('hide')
    } else {
      document.getElementById('site-header').classList.add('hide')
    }

    if (scrollPos === 0) {
      document.getElementById('site-header').classList.remove('hide')
    }

    // if (scrollPos > prevScrollPos && scrollPos > 500) {
    //   document.getElementById('site-header').classList.add('hide')
    // } else {
    //   document.getElementById('site-header').classList.remove('hide')
    // }
  }, [scrollPos])

  return(
    <div id='home-spot' className='app col-fs-c'>
      <div className='showHeaderArea' onMouseEnter={() => document.getElementById('site-header').classList.remove('hide')} />
      <header id='site-header' className={cn(['mk--header', 'row-c-c', {'bottom': scrollPos > 5, 'hide': scrollPos > 500}])}>
        <div className='row-sb-c mw'>
          <div
            className='row-fs-c'
            onClick={() => document.getElementById('home-spot').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})}
          >
            <img src='face.jpeg' />
            <div className='col'>
              <span>Matthew</span>
            </div>
          </div>


          <div className='links row-fs-c'>
            <div>PHOTOGRAPHY</div>
            <div onClick={() => document.getElementById('writing-spot').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})}>WRITING</div>
            <div onClick={() => document.getElementById('projects-spot').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})}>PROJECTS</div>
          </div>
        </div>
      </header>
      <div style={{height: 88}} />
      <div className='mk--hero mw col-c-c'>
        <h2>Build something</h2>
        <h3>memorable.</h3>
      </div>
      <div className='top-divid' />
      <section className='mk--intro mw'>
        <div className='col'>
          <h1>Hi there! I’m Matthew.</h1>
          <p>I’m a self-taught developer and designer building magical software on the web.</p>
          <p>I am a founding engineer at <a href='https://newcraft.io'>NewCraft</a>, a startup helping companies hire better.</p>
          <p>I love creating pixel-perfect interfaces and often blend both flat and skeuomorphic roots.</p>
          <div className='row-fs-c'>
            <a href='mailto:matthew.kochakian@gmail.com' className='row-fs-c'><img src='email.svg' />Say hi<div>→</div></a>
            <a onClick={() => document.getElementById('writing-spot').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})} className='row-fs-c'><img src='quill.svg' />Read<div>→</div></a>
            <a href='https://twitter.com/kochakian' className='row-fs-c'><img src='twitter.svg' />Follow<div>→</div></a>
          </div>
        </div>
      </section>
      <div id='projects-spot' className='mk--divider' />
      <section className='mk--projects mw'>
        <img className='mk--grafitti' src='projects.svg' />
        <div className='li'><div className='comradery col-c-c'><img src='comradery.svg' /><label>EXPLORE</label></div></div>
        <div className='li'><div className='col-c-c'><img src='newcraft.svg' /><label>EXPLORE</label></div></div>
        <div className='li'><div className='col-c-c'><img src='mighty.svg' /><label>EXPLORE</label></div></div>
        <div className='li'><div className='col-c-c'><img src='portal.svg' /><label>EXPLORE</label></div></div>
        <div className='li'><div className='col-c-c'><img src='cicero.svg' /><label>EXPLORE</label></div></div>
        <div className='li transparent'>
          <div className='col-c-c' style={{height: '100%'}}>
            <h3>Ready to chat?</h3>
            <button className='row-c-c'>Let’s go <div>→</div></button>
          </div>
        </div>
      </section>
      <div id='writing-spot' className='mk--divider' />
      <section className='mk--writing mw'>
        <img className='mk--grafitti' src='writing.svg' />
        <div className='left col'>
          <img src='blog.svg' />
          <h4>Journal</h4>
          <p>I write regular entries in a journal about technology, business, history, and the future.</p>
          <span className='entries'>Recent entries</span>
          <div className='break' />
          <div className='item row-sb-c'><span>The amazon apartment</span><span>read →</span></div>
          <div className='item row-sb-c'><span>The new world is coming</span><span>read →</span></div>
        </div>
        <div className='right col'>
          <img src='paper.svg' />
          <h4>The Paper</h4>
          <p>I also write a newsletter that covers events from history (100+ years) through the lens of the newspapers.</p>
          <span className='entries'>Recent papers</span>
          <div className='break' />
          <div className='item row-sb-c'><span>The impeachment of Richard Nixon</span><span>read →</span></div>
          <div className='item row-sb-c'><span>The invasion of Normandy</span><span>read →</span></div>
          <div className='item row-sb-c'><span>The Assassination of Abraham Lincoln</span><span>read →</span></div>
        </div>
      </section>
      <div style={{height: 200}} />
    </div>
  )
}

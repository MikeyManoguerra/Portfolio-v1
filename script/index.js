/*global portfolioData util*/

function getBaseElements() {
  const main = document.getElementById("main")
  const header = document.getElementById("header")
  const footer = document.getElementById("footer")

  return { main, header, footer }
}

// transforms an object of <string>[] and returns an array of html uls
const handleTechnologyLists = (/*block*/) => Object.keys(portfolioData.technologies).map(techType => util.createSimpleList(portfolioData.technologies[techType], `about__${techType}-`))

function handleCurrentlyLists() {
  const positionsUl = util.createCurrentlyList(portfolioData.currently.positions, 'about__positions-')
  const otherUl = util.createCurrentlyList(portfolioData.currently.other, 'about__other-')

  return [positionsUl, otherUl]
}

function nestGridContainer(el, block) {
  const outer = util.createElementWithClass(el, block)
  const inner = util.createElementWithClass('div', `${block}__inner`)
  outer.appendChild(inner)
  return outer
}




function handleAboutSection() {
  const aboutSection = nestGridContainer("section", 'about')
  const aboutSectionInner = util.firstChildRef(aboutSection)
  const fragment = document.createDocumentFragment()

  const name = util.createElementWithClass('h1', 'about__name', portfolioData.name)
  const wrapper = util.createElementWithClass('div', 'about__heading-wrapper')
  const bioWrapper = util.createElementWithClass('div', 'about__bio')
  const heading = util.createElementWithClass('h2', 'about__heading', portfolioData.heading)
  const cta = util.createElementWithClass('a', 'about__cta', portfolioData.cta.label)
  const vote = util.createElementWithClass('a', 'about__cta', portfolioData.vote.label)
  const bio = util.createElementWithClass('p', 'about__info', portfolioData.bio)

  cta.setAttribute('href', portfolioData.cta.href)
  vote.setAttribute('href', portfolioData.vote.href)
  wrapper.appendChild(heading)
  wrapper.appendChild(cta)
  bioWrapper.appendChild(wrapper)
  bioWrapper.appendChild(bio)
  bioWrapper.appendChild(vote)
  fragment.append(name, bioWrapper)


  const currently = handleCurrentlyLists()
  for (list of currently) {
    fragment.appendChild(list)
  }

  const techLists = handleTechnologyLists()
  for (list of techLists) {
    fragment.appendChild(list)
  }

  aboutSectionInner.appendChild(fragment)
  return aboutSection
}


function handleProject(project) {
  const projectArticle = nestGridContainer("article", "project")
  const projectArticleInner = util.firstChildRef(projectArticle)

  const heading = util.createElementWithClass('h2', 'project__heading', project.heading)
  const copy = util.createElementWithClass('p', 'project__copy', project.description)

  const image = util.createElementWithClass('img', 'project__image')
  image.src = project.image.src
  image.alt = project.image.alt

  const imageWrapper = util.createElementWithClass('div', 'project__image-wrapper')
  imageWrapper.appendChild(image)

  const git = util.createElementWithClass('a', 'project__link', 'git')
  git.setAttribute('href', project.links.git)

  const live = util.createElementWithClass('a', 'project__link', 'live')
  live.setAttribute('href', project.links.live)

  const linkWrapper = util.createElementWithClass('div', 'project__link-wrapper')
  linkWrapper.appendChild(git)
  linkWrapper.appendChild(live)

  projectArticleInner.appendChild(heading)
  projectArticleInner.appendChild(copy)
  projectArticleInner.appendChild(imageWrapper)
  projectArticleInner.appendChild(linkWrapper)

  return projectArticle
}

document.addEventListener("DOMContentLoaded", function () {
  const { main, header, footer } = getBaseElements()
  const aboutSection = handleAboutSection()
  main.appendChild(aboutSection)

  const projects = portfolioData.projects.map(handleProject)
  for (project of projects) {
    main.appendChild(project)
  }
});

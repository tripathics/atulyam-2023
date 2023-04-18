import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    const navEl = document.getElementById('nav');
    const translateNav = () => {
      const navOffset = heroEl.getBoundingClientRect().bottom;
      navEl.style.transform = navOffset <= 0 
                                ? 'translate3d(0px, 0px, 0px)' 
                                : 'translate3d(0px, ' + navOffset + 'px, 0px)'
    }

    if (heroEl) {
      translateNav();
      window.addEventListener('scroll', translateNav)
    }
  }, [])

  return (
    <div>
      <div className="hero" id="hero">
      </div>
      <section className="intro-section">
        <h1>Hello Atulyam 2023</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, id sequi error vitae recusandae, temporibus tempora eligendi sed fugiat quibusdam ab ipsam! Est temporibus quaerat magni placeat rerum vitae minus, consequatur libero in distinctio voluptas amet vero sequi rem ipsa pariatur tenetur fugiat dolorem blanditiis soluta officia, consectetur illum sit. Perferendis, deleniti veritatis quam atque nihil dignissimos officiis cumque. Dicta, atque. Numquam, magni hic excepturi autem, facere nobis quidem ducimus maiores, repudiandae distinctio error quibusdam molestias? Consequuntur quasi autem illum ex tenetur temporibus, magni pariatur iusto possimus inventore nam, saepe est, modi nostrum sunt non rem numquam. Perferendis asperiores, fugiat laboriosam minima eligendi sapiente. Quidem esse repudiandae laudantium harum dolore sequi quae, officiis possimus nesciunt similique magnam fugiat aperiam architecto impedit, eos soluta maxime placeat voluptates. Excepturi perspiciatis ipsam, possimus, fugit nesciunt beatae dolor quia, molestiae repellat voluptates officia quod iste natus illo. Veniam aut error eligendi vel incidunt ea sint cupiditate libero voluptatum eos quasi possimus consequuntur minus, placeat molestiae, dolorum quod nihil animi excepturi quae nostrum, beatae consequatur totam! Optio quas eos odit pariatur esse aut similique. Repellendus vero beatae doloribus veritatis consequuntur quibusdam aliquid? Vero voluptatem culpa aliquid ipsa? Magni, dolores! Accusantium nulla blanditiis, cupiditate officiis cumque excepturi perferendis soluta tenetur temporibus, veniam alias eos maxime doloribus labore, commodi sapiente ducimus! Mollitia sit laboriosam illo consequuntur dicta maxime maiores quis minima porro vitae. Possimus, illum repudiandae! Sequi deleniti aut vel veniam quis voluptatibus cum praesentium maxime, quasi ipsa. Dicta asperiores expedita consequatur tempore earum sapiente eligendi vero velit rem quam, magni modi nam debitis rerum id saepe porro. Non dolor aliquam sit quaerat numquam voluptate nostrum a soluta natus, laudantium quam aliquid distinctio consequatur inventore! Ex, deleniti nobis. Enim odio dicta quos amet nesciunt veniam at voluptatum reiciendis obcaecati repudiandae, nisi, possimus itaque dolorem ipsam sequi nam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, id sequi error vitae recusandae, temporibus tempora eligendi sed fugiat quibusdam ab ipsam! Est temporibus quaerat magni placeat rerum vitae minus, consequatur libero in distinctio voluptas amet vero sequi rem ipsa pariatur tenetur fugiat dolorem blanditiis soluta officia, consectetur illum sit. Perferendis, deleniti veritatis quam atque nihil dignissimos officiis cumque. Dicta, atque. Numquam, magni hic excepturi autem, facere nobis quidem ducimus maiores, repudiandae distinctio error quibusdam molestias? Consequuntur quasi autem illum ex tenetur temporibus, magni pariatur iusto possimus inventore nam, saepe est, modi nostrum sunt non rem numquam. Perferendis asperiores, fugiat laboriosam minima eligendi sapiente. Quidem esse repudiandae laudantium harum dolore sequi quae, officiis possimus nesciunt similique magnam fugiat aperiam architecto impedit, eos soluta maxime placeat voluptates. Excepturi perspiciatis ipsam, possimus, fugit nesciunt beatae dolor quia, molestiae repellat voluptates officia quod iste natus illo. Veniam aut error eligendi vel incidunt ea sint cupiditate libero voluptatum eos quasi possimus consequuntur minus, placeat molestiae, dolorum quod nihil animi excepturi quae nostrum, beatae consequatur totam! Optio quas eos odit pariatur esse aut similique. Repellendus vero beatae doloribus veritatis consequuntur quibusdam aliquid? Vero voluptatem culpa aliquid ipsa? Magni, dolores! Accusantium nulla blanditiis, cupiditate officiis cumque excepturi perferendis soluta tenetur temporibus, veniam alias eos maxime doloribus labore, commodi sapiente ducimus! Mollitia sit laboriosam illo consequuntur dicta maxime maiores quis minima porro vitae. Possimus, illum repudiandae! Sequi deleniti aut vel veniam quis voluptatibus cum praesentium maxime, quasi ipsa. Dicta asperiores expedita consequatur tempore earum sapiente eligendi vero velit rem quam, magni modi nam debitis rerum id saepe porro. Non dolor aliquam sit quaerat numquam voluptate nostrum a soluta natus, laudantium quam aliquid distinctio consequatur inventore! Ex, deleniti nobis. Enim odio dicta quos amet nesciunt veniam at voluptatum reiciendis obcaecati repudiandae, nisi, possimus itaque dolorem ipsam sequi nam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, id sequi error vitae recusandae, temporibus tempora eligendi sed fugiat quibusdam ab ipsam! Est temporibus quaerat magni placeat rerum vitae minus, consequatur libero in distinctio voluptas amet vero sequi rem ipsa pariatur tenetur fugiat dolorem blanditiis soluta officia, consectetur illum sit. Perferendis, deleniti veritatis quam atque nihil dignissimos officiis cumque. Dicta, atque. Numquam, magni hic excepturi autem, facere nobis quidem ducimus maiores, repudiandae distinctio error quibusdam molestias? Consequuntur quasi autem illum ex tenetur temporibus, magni pariatur iusto possimus inventore nam, saepe est, modi nostrum sunt non rem numquam. Perferendis asperiores, fugiat laboriosam minima eligendi sapiente. Quidem esse repudiandae laudantium harum dolore sequi quae, officiis possimus nesciunt similique magnam fugiat aperiam architecto impedit, eos soluta maxime placeat voluptates. Excepturi perspiciatis ipsam, possimus, fugit nesciunt beatae dolor quia, molestiae repellat voluptates officia quod iste natus illo. Veniam aut error eligendi vel incidunt ea sint cupiditate libero voluptatum eos quasi possimus consequuntur minus, placeat molestiae, dolorum quod nihil animi excepturi quae nostrum, beatae consequatur totam! Optio quas eos odit pariatur esse aut similique. Repellendus vero beatae doloribus veritatis consequuntur quibusdam aliquid? Vero voluptatem culpa aliquid ipsa? Magni, dolores! Accusantium nulla blanditiis, cupiditate officiis cumque excepturi perferendis soluta tenetur temporibus, veniam alias eos maxime doloribus labore, commodi sapiente ducimus! Mollitia sit laboriosam illo consequuntur dicta maxime maiores quis minima porro vitae. Possimus, illum repudiandae! Sequi deleniti aut vel veniam quis voluptatibus cum praesentium maxime, quasi ipsa. Dicta asperiores expedita consequatur tempore earum sapiente eligendi vero velit rem quam, magni modi nam debitis rerum id saepe porro. Non dolor aliquam sit quaerat numquam voluptate nostrum a soluta natus, laudantium quam aliquid distinctio consequatur inventore! Ex, deleniti nobis. Enim odio dicta quos amet nesciunt veniam at voluptatum reiciendis obcaecati repudiandae, nisi, possimus itaque dolorem ipsam sequi nam?
        </p>
      </section>
    </div>
  )
}

export default Home;
import { IBlog } from '@/types/blog-d-t';
import blog_1 from '@/assets/images/blog/blog_img_03.jpg';
import blog_2 from '@/assets/images/blog/blog_img_04.jpg';
import logo_1 from '@/assets/images/logo/media_01.png';
import logo_2 from '@/assets/images/logo/media_03.png';
// blog list images
import blog_list_1 from '@/assets/images/blog/blog_img_06.jpg';
import blog_list_2 from '@/assets/images/blog/blog_img_07.jpg';
import blog_list_3 from '@/assets/images/blog/blog_img_08.jpg';
import blog_list_4 from '@/assets/images/blog/blog_img_09.jpg';
// blog grid images
import blog_grid_1 from '@/assets/images/blog/blog_img_03.jpg';
import blog_grid_2 from '@/assets/images/blog/blog_img_04.jpg';
import blog_grid_3 from '@/assets/images/blog/blog_img_12.jpg';
import blog_grid_4 from '@/assets/images/blog/blog_img_13.jpg';
import blog_grid_5 from '@/assets/images/blog/blog_img_14.jpg';
import blog_grid_6 from '@/assets/images/blog/blog_img_15.jpg';

const blog_data:IBlog[] = [
  {
    id:1,
    img:blog_1,
    date:'09 FEB 2023',
    title:'Wise Spending Habits, 13 Tips for Maximizing Your Money.',
    author:'Mark doe',
    post_info:'Mark doe . 6 min . Finance',
    category:'design',
    page:'home'
  },
  {
    id:2,
    img:blog_2,
    date:'12 aug 2023',
    title:'Business Success: Lessons from Visionary Leaders',
    author:'John Smith',
    post_info:'John Smith . 7 min read . Travelling',
    category:'ui',
    page:'home'
  },
  // home 5
  {
    id:3,
    img:logo_1,
    date:'18 Jul 2023',
    title:'Designer’s Checklist for Every UX/UI Project.',
    author:'John Smith',
    post_info:'Featured',
    category:'DESIGN',
    page:'home-5'
  },
  {
    id:4,
    img:logo_2,
    date:'20 Aug 2023',
    title:'Speaking remotely at WordCamp US.',
    author:'John Smith',
    post_info:'Trending',
    category:'Event',
    page:'home-5'
  },
  // blog list
  {
    id:5,
    img:blog_list_1,
    date:'09 FEB 2023',
    title:'Spending Habits, 13 Tips for grow Your Money.',
    author:'John Smith',
    post_info:'John Smith . 6 min . Finance',
    category:'Design',
    page:'blog-list'
  },
  {
    id:6,
    img:blog_list_2,
    date:'12 APR 2023',
    title:'Our Travel Card Makes you Happy.',
    author:'Orion Frostfall',
    post_info:'Orion Frostfall . 5 min . Travel',
    category:'Development',
    page:'blog-list'
  },
  {
    id:7,
    img:blog_list_2,
    quote_blog:true,
    date:'15 JAN 2023',
    title:'Budget your desires, investing knowledge, & let compound interest build your future.',
    author:'James Bond',
    post_info:'James Bond . 5 min . Travel',
    designation:'Founder Agro',
    category:'Development',
    page:'blog-list'
  },
  {
    id:8,
    img:blog_list_3,
    date:'20 JUN 2023',
    title:'Manage your Online Banking & Get Rewarded',
    author:'Asher Stormforge',
    post_info:'Asher Stormforge . 7 min . Banking',
    category:'Development',
    page:'blog-list'
  },
  {
    id:9,
    img:blog_list_4,
    date:'22 MAY 2023',
    title:'It’s easy to Buildup your Business with us',
    author:'Octavian Wraithwood',
    post_info:'Octavian Wraithwood . 3 min . Business',
    category:'Development',
    page:'blog-list'
  },
  // blog grid
  {
    id:10,
    img:blog_grid_1,
    date:'08 JUN 2023',
    title:'Spending Habits, 13 Tips for grow Your Money.',
    author:'Declan Thornheart',
    post_info:'Declan Thornheart . 6 min . Finance',
    category:'Development',
    page:'blog-grid'
  },
  {
    id:11,
    img:blog_grid_2,
    date:'13 APR 2023',
    title:'Our Travel Card Makes you Happy.',
    author:'Rylan Blackthorn',
    post_info:'Rylan Blackthorn . 7 min read . Travelling',
    category:'Development',
    page:'blog-grid'
  },
  {
    id:12,
    img:blog_grid_3,
    date:'15 FEB 2023',
    title:'It’s easy to Buildup your Business with us',
    author:'Caspian Thunderstrike',
    post_info:'Caspian Thunderstrike . 6 min . Finance',
    category:'Development',
    page:'blog-grid'
  },
  {
    id:14,
    img:blog_grid_4,
    date:'18 OCT 2023',
    title:'Manage your Online Banking & Get Rewarded',
    author:'Leander Frostblade',
    post_info:'Leander Frostblade . 8 min read . Travelling',
    category:'Development',
    page:'blog-grid'
  },
  {
    id:15,
    img:blog_grid_5,
    date:'20 AUG 2023',
    title:'It’s easy to Buildup your Business with us',
    author:'Gideon Starfire',
    post_info:'Gideon Starfire . 6 min read . Blogging',
    category:'Development',
    page:'blog-grid'
  },
  {
    id:16,
    img:blog_grid_6,
    date:'21 MAY 2023',
    title:'Manage your Online Banking & Get Rewarded',
    author:'Finnian Stormcaller',
    post_info:'Finnian Stormcaller . 5 min read . Accounting',
    category:'Development',
    page:'blog-grid'
  },
]

export default blog_data;
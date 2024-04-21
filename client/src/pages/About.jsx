import React from "react";

const About = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="max-w-2xl p-3 mx-auto text-center">
          <div className="">
            <h1 className="text-3xl font-semibold text-center my-7">
              {" "}
              About My's Blog
              <br />
              关于宇宙的浪漫
            </h1>
            <div className="flex flex-col gap-6 text-gray-500 text-md">
              Welcome to my blog, where curiosity meets insight! Dive into a
              world of intriguing discussions, detailed guides, and personal
              reflections. Whether you're seeking inspiration, knowledge, or a
              community of like-minded enthusiasts, you've found the right
              place. Join me on this journey of exploration and discovery. Let's
              learn and grow together."
              <br />
              <p>
                我与你身体里的原子
                <p> 在几亿光年之外，在宇宙的伊始，出自同一母体，</p>
                <p>黑暗中我们抬头走来 星辰从远方而来 赴一面之约 生生不息，</p>
                这就是宇宙的浪漫
              </p>
              <p>
                <p>其实分别也没那么可怕 </p>65万个小时之后 当我们氧化成风
                就能变成同一杯啤酒上
                <p>两朵相邻的泡沫 就能变成同一盏路灯下 两粒依偎的尘埃</p>
                宇宙中的原子不会泯灭， <p>而我们，终究会在一起</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

# encoding: UTF-8
# frozen-string-literal: true
#
# =================================
# The Curriculum Vitae of Cẩm Huỳnh
# =================================

DeveloperRepository.find_by_name("Cam Huynh").inspect

{
  profile: {
    name: "Cam Huynh",
    handler: @huynhquancam,
    title: "Software Engineer",
    location: {
      city: "Saigon",
      country: "Vietnam"
    },
    gender: :male,
    contact: {
      email: [
        "cam@hqc.me",
        "huynhquancam@gmail.com"
      ],
      website: "https://hqc.io"
    }
  },
  education: {
    degree: "Bachelor of Engineering in Computer Science",
    university: "Industrial University of Ho Chi Minh City (IUH)"
  },
  experience: [
    {
      company: "FootballAddicts",
      website: "http://footballaddicts.com",
      title: "Back-end Developer",
      from: "Sep 2016",
      to: :present
    },
    {
      company: "Dadadee",
      website: "https://dadadee.com",
      title: "Lead Back-end Engineer",
      from: "May 2015",
      to: "March 2016"
    },
    {
      company: "ITViec",
      website: "https://itviec.com",
      title: "Ruby Developer",
      from: "Jan 2015",
      to: "May 2015"
    },
    {
      company: "FutureWorkz",
      website: "http://futureworkz.com",
      title: "Lead Software Engineer",
      from: "July 2012",
      to: "Dec 2014"
    }
  ],
  projects: [
    {
      name: "bootstrap_validator_rails",
      url: "https://github.com/huynhquancam/bootstrap_validator_rails",
      tags: [:validator, :bootstrap, :rails],
      technologies: [:Rubygems, :Bootstrap3, :Rails]
    },
    {
      name: "docebo_ruby",
      description: "Ruby wrapper for Docebo API",
      url: "https://github.com/huynhquancam/docebo_ruby",
      tags: [:api, :docebo],
      technologies: [:RestClient, :Ruby, :RubyGems]
    },
    {
      name: "chat_stack",
      description: "Chat stack = RESTFul API + WebSocket",
      url: "https://github.com/huynhquancam/chat-stack",
      tags: [:chat, :restful],
      technologies: [:WebSocket, :Ruby, :Node]
    },
    {
      name: "heroku-gitbook-buildpack",
      description: "Heroku Buildpack for Gitbook",
      url: "https://github.com/huynhquancam/heroku-buildpack-gitbook",
      tags: [:heroku, :buildpack, :gitbook],
      technologies: [:Node]
    },
    {
      name: "dotfiles",
      description: "My personal terminal setup",
      url: "https://github.com/huynhquancam/dotfiles",
      tags: [:dotfiles, :vimrc],
      technologies: [:VimL, :Bash]
    }
  ]
}

# Thanks for viewing!
# Source code can be found on [Github](https://github.com/huynhquancam/rbcv)
# Copyright 2016 by @huynhquancam

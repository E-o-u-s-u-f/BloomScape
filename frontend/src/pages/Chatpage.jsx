import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

const inboxChats = [
  {
    id: 0,
    name: "Dhruvo",
    lastMessage: "Can you tell me your experience?",
    timestamp: "10:30 AM",
    profileImage:
      "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/463385899_1030702125474008_4514660079567697957_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHqDa6AYKv-Zsge2DVcxrsewkJ_pMWIZGbCQn-kxYhkZpChCCywRKIXkXW6r9aaSC0TMl5UqcC3U82op2ESd2UA&_nc_ohc=l8Gu3eF0LcMQ7kNvgHAn5HQ&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=A7CBN2vIZcagR5B66-ul6ei&oh=00_AYCivEe9CrWEBFUUTaT7hMFYc4HDC1BM_pz-bQZcmppzqQ&oe=6799BA60",
    unreadMessages: 2,
    isOnline: true,
  },
  {
    id: 1,
    name: "Tibro",
    lastMessage: "Can you tell me your experience?",
    timestamp: "9:15 AM",
    profileImage:
      "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/467309338_544752341884509_43585402498420033_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeH_tKYldXTutH0sZkzMpvvEi38V6iDo0fKLfxXqIOjR8j_e1INxe7sz4NWOKT_PKn1AKHxpM-SuMAhVttNU9RkP&_nc_ohc=hL1Y9FMORJYQ7kNvgGUA8ij&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Ap4t9D7xqepI4bBFnzuuU-L&oh=00_AYCsIcsFnJFzNrVmaBRj9Jq1BANcqxJkVVtJPP50tVqCqw&oe=6799C4BC",
    unreadMessages: 10,
    isOnline: false,
  },
  {
    id: 2,
    name: "Eousuf",
    lastMessage: "Can you tell me your experience?",
    timestamp: "8:45 AM",
    profileImage:
      "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/474483707_1191931369118124_5538215198107449011_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGtDjE-eoz4YNbK-s0UhOUkKoQ_nxjDgIMqhD-fGMOAgyjTlWGvvf9AfiEOGw-BCnFSM1U8PphwCXDTkbH8i6Pj&_nc_ohc=T29OdWvwMocQ7kNvgHII0AG&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=AA00HrZP9_tvgR7CPoj_F-Q&oh=00_AYBi79G_7ssBzNvvZItLlNwiGrVlnpfk2jRD5QochFeHJQ&oe=6799BA6A",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 3,
    name: "Rafy",
    lastMessage: "CP CP CP",
    timestamp: "8:45 PM",
    profileImage:
      "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/377574145_833652851768856_9169122203741747444_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEQidhw2430kA11XmyhsacsQ8xPA_YCenBDzE8D9gJ6cEoI2iV4ZXnmg_bLSIjEEzHTI4XQXjEmnYjjioGhq9HH&_nc_ohc=KHsCqRISdToQ7kNvgELjzJc&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Ab3Hb4W6i9XAAx9T5WijD4W&oh=00_AYDFRtdcGg04YOXlxW1401jYPaWQyrRA-7En_odZsQjgWA&oe=679ACB23",
    unreadMessages: 1,
    isOnline: true,
  },
  {
    id: 4,
    name: "Mejor Dalim",
    lastMessage: "ek ek kee dekhe nebo",
    timestamp: "8:45 AM",
    profileImage:
      "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/474368592_466794333153338_7067618515941140559_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeF29QgZvo2R9QzMrKM5XrFtJaF7Up2DxdkloXtSnYPF2dAqbTPou3c8dt3SopMgc8K_JDgPCVllddAKrxYchwWv&_nc_ohc=0S-JfnjvL38Q7kNvgF1R_Vn&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=AS99OvHs1oPdfZHqfl5sjID&oh=00_AYC-lD5ILHJnCvkvxALStZcEapZm0JW8aqL5fMaMIe5U1Q&oe=679AC74E",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 5,
    name: "Hasu Apa",
    lastMessage: "Sheikh Hasina palay nah",
    timestamp: "8:45 AM",
    profileImage:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAQIHAAj/xAA4EAACAQMCAwYCCgEEAwAAAAABAgMABBESIQUxQQYTIlFhcTLBBxQjQoGRobHR8OFSYqLxFSRy/8QAGgEAAQUBAAAAAAAAAAAAAAAABAABAgMGBf/EACMRAAICAgIBBAMAAAAAAAAAAAABAhEDEgQhMRMyQVEFYYH/2gAMAwEAAhEDEQA/AOsI+Rh9h1Oc5+dZkGRqxjywR+9YYqF06dseVaYIRSWDKOmaqJEy6VU6iCD1IqFnLHArcBhp1HUB92t/jjwV3H6flSEY1kbEHAG4zyqnNfQxth5ow/RA2WPsOZ/KlPtTxiN+JGzZWZIgNyRpyRnOM46+tQQWxvAq2as564GFH8U/Qkmx2hv45890Rn7ysMEfhUZmLHQCPiGfzoGi3VhBloS2DktnJWrPDeNxXLLbyFcswKuDg8+tM+/A+rXkNq5Ixn8Kw6N0ZfYZ2r3c7bMAOm2a8X1L5sTg52pDHDfpmu++7TrCGyIIFX89/nXPDuaavpBna/7Y8RMfixKUHsNvlQROHrp+0fxf7aTnGPknh4uXP3BH1Oo1Pg7dfWsMdXwnUR6c60DZOOorxYK+dgMcqYgTIBjSTuOYFVL+57i1kdjj7qeWo7D96sIMqQANzttS/wBsbkwcKU4BPej73lmpLyJ+BOm7ifjlwXI1tM2d89dv0xTRw29ltoilvF4QPu1zL6+312a5skErm4dWR9ShQDz1Y33zVpu0XF0mXu5shfihRdgPLOBmqJt7NhWOtUmdNn4ncPESyahjypN40HgdbyzcRyat1zQ277V3TxxmwJRTGru8kLKMHyB+Ieo2PnUV5xa8uYV7+2t3i8OqeJmBGTj4NO59NqgnKybUao6d2c4lJxG0TvwTJp1DOd/PHtRaRwkZyAuOppG7F3REdg6NqBY4ypGxJ6dPam3js5t+E302V8MDnB58jRMukBwW0qOA35Vr24dRkyOWZjzJJzVUipZjmRveoxXPbvs18IKEVFH0qrssexrWRtXt0rJJBONwOtYkOlQFyM+Zo8yBlG0gY3PSlLtvcx3Iih8LKGI2IALY/mme7kKwYBKEjdvSkXtDqmk0IcCPcDHUVdjh1syqU+6QscBiWLv1YoJe/YqWHhzkg5HXrROZ+HLcFbqVJGdT3kkcRjRR1GxY5PLIx7ihE5C3rRk4WRBIrauh5/tVrh/DLt4ppIp1ELnBDQ62b2Ofw5UDPaM2jp4tZQTDvHb3ht2Ld4tOtYRGV0atUYO3hGOW55jrz5GGGKM24jEls8AHhEKFTnpnJPXfAoZw7ht/GZFSeBNWQ3e2xG351izhaFwjFtedx0B61Byl0TcYpMN9ibXEnDhJ4iIlZ9sbgZ/emTtxKIezN42QdShRj1IoV2PXHEQo+FYSMgewqX6S5O67MMvPXKqj8Mmi8rqP8A+Its0V+zjjHJNYr3WvYrnmsPpF3CAYwSRuMHaq08wjjZ5RnyHmelSSLqAYNnFD7hssTjZOXqev/ddKEN3RjJyUVZFLK4cqHypIJ3wPYf4oBxlPGAOZ8W5P9FHdwpcY1HfJ2z8+vKg17EZb1XYggDJAflv/ALqN0dAnqKxL4hCzQidOduxBIGwRupPo2n8Car8H7Q3FrIUB0uDhkPQ9aYpraMXbo4zFIuGG+2RgjkPelrtFwdoJILkBld10Ox5M67ZHuB+lBcnGq2DuNkqWoaue0UssewVSeuMVjh7yfUJrhvE0h7sZ6DYml23DmTVLpxgZ60StbiRe80bQ6VVmPKNi2FJ9ycfjQmGnNWFci/TdD92HgLSXFw5wqroB9Tufyx+tD/pYnA4PZwqclpiffA/zV3sg17Y27Ws0TMHIfCkeDYD5UvfS3cg3XD7cEZEbOR7nHyojkJqJH8ats8Tn9er1ZoA1B9B3Fw1tbGQjUeSZHXpQsNKviBMinntqIPyrPGrhprxYA+FjG+DzJ/xVC4e5tD3yyNNBuHRh8I9Nv3ruceNRswXIlboKxuHB0nfkSD86rJGO8diQSTzJUnn61LZH60rTwMmwGVO5GTt/RUkq9ywXXqkI3QNgrRNoH0Yvccg0d1cLuYzzzqOMb8tqi4nYf+R7O3AjbTNEyzRnHMjY/wDHIpkurWKa3KXR+zcYIZjvz/uwoJwefuL57dh4CSq52yp9/SqJxTTX2E45NV9oWrfs5OxC3cwh2y0ca/aH+P7tRix4dou/qvC4QJGA7yTOQgGcHPU77fjR48PIeNFDu8zkZBxtjOrH+ofzU6TLw2F4Io071j9o+cftVUMEMfgunlnP3eCHhXC1me6Mcp0wOqKNQyTzJJx8ulSca4NZ3NslpxC2E8cikxMAdSH0PMHf8arcDljh1ljpWbBYY1Lvvvt61d4g7TzwtHKHjjGlYUjwEHXG392ptZufftFvqrj00cm7Q9np+DSa1k+sWbsRHOvQ/wClvI/of0oLXYYkhvLi6sLqFJoXALRyAEZz+e23sd6V+I9hInu3PDr1oIOkcsZkIP8A9aht70Lm4jTuHg7nD/Kwcdc3TXyNOe9dppc5ds5HTP8A3VqJ2j+0K96nJsHnkY8RqnE7RoZEOGxv5N6GiBRRaxXAADSA5UfCPYV1UlVGVbd2CeGzQ2vEHigmKr93I8Sg8wPXlvTRDEzIp0aQRy18v5PrSdLleI20gJy7sp8gB5U42UjNCMmq2u6LVKo2bMukFcuu2ATvj23zShxawCubm3kk7+M4+PUWAG2R0Gevr6U5FRIrBhtjpQSO3jns7rUCo1uMLt5Ukvgm3as0tOIPd2UbIzROgOCGII8xWL29laJbU3Dlrhu7yxB0Dqcjp65obZNodJVAzcRB3HTUMjI98VPI3/vhz4jFD4NW+NQ3phy/ZRBMsBrjZtJXyqcd3GrxxJllHicnlWvDhmMeRHKrYjTuJ5NILrkqfLalY4vCTuuImbUFyxQk7dNs/wB/GrM4l17EggYYetDbwYnfHSYD3HL50TkOlzjrvTsaPR//2Q==",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 6,
    name: "Shahabgi",
    lastMessage: "ei ei wait ei ei wait",
    timestamp: "8:45 AM",
    profileImage:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUWGB4aFxgXFxsgHhoZIB0eGh4fGh0dHSggHSAnHxsdITEjJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGjUmICYuLzIyLy8tLS0vLzUtMC8rLS0wLTUtLS0vLTUvLS0tLS0tLS0tLy0tLS0tLS0tLy0tLf/AABEIAR0AsQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgQHAAIDAQj/xABDEAABAgQEAwUFBQcDBAIDAAABAhEAAwQhBRIxQQZRYRMicYGRMqGxwfAUQlLR4QcVI2JygpIWovEkM1PSQ2NUZLL/xAAaAQACAwEBAAAAAAAAAAAAAAADBAECBQAG/8QAMxEAAQQBAwIDBwQBBQEAAAAAAQACAxEhBBIxQVETYbEFInGRocHwMoHR4TMUI0JD8ST/2gAMAwEAAhEDEQA/AKzwguEIWCG1DX0hlwCuClFCUsl9xeBIAVNBuVtbra0GuFEhIK5mxNoE91NtHjj9+lIx/DyStYT3SXtoB0GohZoZpCik82htq+IZaiqVlDKDawm1AyzDbQ3iI8iirS4cCEySa5MsZif+YjzlpnfxJxIGwSA/qbAQGqp+bK0EabCJc1s9blA2MuwIve5e7RJxwpYNxzlbyqahy5jNW/8AUgNy2LmJNbiUwF84mpOhYA82LW53jSfg0tQU9Q6VWUQCPn8oH1NHTy0ASpiyrcFQIPl8oi/NXcyhxSkVk8qS/OIaaoy++znSNRUPLHPePPtKEjvhwdIIG4pKvdm+qBYtPKyVq1OkQJAvEzEw6gEAlzYDV9gIfuHv2WgIE3EZ/wBnHtdiljMys7rPsyxrry2jjgZVWtc7AUXgjDETqWaVksiZcJ9onKMrWO8Fp03snH08F+H8S4fpiUyJ01ObUzO2yqI3snK0NWFrpJigaVdFOOwSJWZvAufQCAuYSU3E4AVefPH14SBTY2wfPfy+cC6SmE6bkkSzMXySHbxbSLrm4quWGmSkjmMn5A2jpR4tILsOz3JQzc7tfTcjSOFcWrkOq9v7qr8S4Gqk05PYlR1KUEKPkAb+TwkJwd2IHiDsY+k56SE5k94NqlGY+WUgl3u4aEXjnhlK5aqmlQ0xF5qU5e8NSogKPfGtteTxauyqCDyquTQiUFEAAsdIFTKbOQEh4KT5pKSekCsJxTsyokX2iC0upLTVdBFuHqEonOsM43g6qS6yCzQj1GMqWuxLk2hjw+eSEku41gzW7UMAnARn9wyvoxke/b+sexNlW2hK+GVhlz86FN91+kNOGmWvMhY3+MMNd+yuXNJnUk0JzF8itH6NpCriNPMp5/ZTWCwLgF4BI3smYH9CiH+nZKTnGkAeMcHYidLuCBmHLZ4LT8RGVlAkchHldUhctCAhScqSHKgdh/6++KsJGUZ7ARQCr6ZM90bZCr75SeYPrEyvptWHjAuZMIt9fnDHKRBK9mILgGYsg7FRjZKMosYjqqfdG9NmVHAKSVPpQVd0R0qKEzVsk2QGtz3ibg9OxBOsPnCPDgCkTlpAlo75f7y/uD1ueiTEOcRwrMYCcrMK4Wl4cgVCwn7UpLozM0gOAVBwQVh3J2Yt1RuKOJTPUuVLUoSQe9m9uYQdVuHZ7hPrfQ3x7xe9UJYUrJLUDMALEm3dBGyWHiR0hJrgZ85c1APeU4DX08Iq0F2SjvOwbGDPVQZ00jRxEVSyS+8GEYDPVdT+GsazsDUkbvBth7IPgSnNJj4V/alW0gEuYftEr8Mw94D+VXyL+UWNhXGOH1wAH8OZbu6KsXsNFeR/I0NOpSI4AsesVcLw5Ua6SI200vpVM6bJHaSVkpOuV8rCwzg2SdPp4P0GKJnpSZqDLWbJWLF76dLeBiheDePFyVCXUKzILDObkDRl8x1YkdRaLdp6uUZYmIfZSgL5Q7gjKWysXYdSIFtLOOEwJmzYIp3r/aU+OeBZsteem74W5XLA2f2pZfS907OCLWFfTeHKkukSTmOmnUjf+U+kXph3EcpRElbguMhIL5u6wfm7x4cGp5c0rTZBJWBsknOVDwdRI8QIIACNwQZGEOoqicFwIhWeYWI2gmuYQtkByeUOmLVlOkhPZgws4rVgqBkoCSbRXk2VJsCguP2afyHrGRCar/FGRO5vdV2ydlf9DMEqzs0IXHhNTMT2aBmCrqbbxg/h9eaum7RAzTEhpksa+I8YU52MHMZaQQSW7wuOkSTYwiO05j5OQcjslRc3Kplac46SJ8vMMurxJVhsyYpSUy1rIcnKkm3MsNIJcMcILUTUTUlElAKgSGK1fdCQbs5BJ5QsmbAygNRJBgXW4eDs8G60ZVq8Y4ZxF7IS+0OJCWf3Yl4I0tME7NE6ZL5RzZotuUFtcqTRBjFl4hUfZqDvX7OVnUNbs7EeaA/UwhcMUna1MpB0zOr+kXPwh74npDPoa2ZoAgISP78y/i0ciRCyXdvU4CqHAaELPazRmKyS55kuT4mHKkppQT3UB925QKpaXugaDQcoIU6GDakfm0NtYWi1qSiPTR+8aArPnwpNht74gVqs3L0giuVY3HW3wO8ay6EXLP1vf6vDAhd0KL4aT66iCndLeUL+IUGS4ixKqlBdtORhcxmUGNrHeF5G0aKS1GmBBI5SdD9+zPHFIKpKj3AHSfw3JILXyve1wbjd0OYli0O37NqLOJ6vw5ALavneBBZAAuirGraZJT2ko6MotcJUT3VIIJdN7t4jcDbHakzaSXOCe8hVxyfuqH+QHpAPA56qc7lL+zqHOtvP4QcmZewmoR7GXOkPcMEk+Qs3iIrW0GuoTdl5bv5B57j+R6fBJFPNE+crMWYfTxxVMSCdS2hgghKDMDnITqobiJ+I4dKRKzS5qVtqLP7opE7eMilGpj8J1ApZ/e3jHsZ26PwH0jIv4bUDxn91Z3BeErpSJsxZSVN3Ry68zDtW8OU9YUTZsrKQXSUllEfzNseURRUSU+yxI0JuYZKKZmlpPMCIaW/parzySSO8R5yVGq5aJUhfZoSkBJLJAAtrYdIScTrFLlzCT934EH4PFhTZYUlSToQQfAiK3+zLPcKD96Wo7PdHxisgVYzdqs8UHfPjEXswRyg9XYDN1ykj4QKn0K06hoGjtChZBzibjFPLRMaUxTlGis13IN36D120iMaNW4jqKXY6RysW4R3gSWAqbNP3UZQep1+XqIaeNsSNPhcqUkB55AUTslis+JsB5wJwNCJdIFqByqmNbpY35Fh6RH/a5WhcqmTLum5GXcAAeIFxBAacFDNzWEjv6JO/fOWygfERIp8UDXPd36wuJpppN0qYb/dZ9idf+YYMNwjPJUrRrEXufr4w/ETJhNQu/wBUwsmANUpaeK5SC7KUrYAfn0aJaOL1K9mU3UkN8dYS8QolpClt7LO+gu0a0ilKOROcKOoADnyI6fiiTqXtwu1GsljftA/Pr6KxaCvlz1gTU5UtrmbdtfrTyhZrEhVncPaA0ictCmCw45gp8lA29CYKSlLKcyksNyNHgUkgfldD7Thcf9w7T2KVMYpMi3Gh+MWL+yBKfs1QSHJmAWGwTv6wm8QSu68Ov7M8PKqBZBZSpym5NlSk+l/fAgKKU1MLWzV0KJYhK7w2BL3H0dWHmIn4NUZFpBBIDpZr6aefvaOGLpyTEJY2FmHRr8x4xvh0nvqV+ABX+4P7j747/khv/wAYH7rfF+GETf4kktvlG4N+7y8IRKSSTUqlS1JKg75y2VucWoueHGXlEVeE0k1Spq5KVTCGKhYluRG8MSwe5vZ8lkxaw+N4Ux4NA+XS/wCUofuKq/8AJI9TGQb+xUn/AOx6qjIzfFetrwWKcgqKtYsbhacTTgG5SSPn84qrD6k5rxYPB1U+dHQEfA/KLx8oco91MyJ++x9xhY4kx00ygAkMtyD13/OCqlKlrJvlUffAXj3Du1psydZZzjw390MPZYS7HUUEruLlocJCbHVhcG7/AFzhBxbEzNWVEMSdtIl1RfKfxJbzTb4NEGZIAJELUmgopqCfKNZc4qtz1jVaspiTRoYmYR7F+hUbAfPwBi1Ku5OHZf8ARS5QNjYizuAtRubWKhfpC6um+0G5IyJyg8gHJ95Pug3TFSaaU7+1m2u4OnVkn1gEKwSyoM9y/Oxg2m2mXPZa+iaBECfP1K502BKBypzqKiwAOr9IN4hJTTy0SGAYuo81fOBVBxC0zMktMWcqQQWAOp56sLfOItXiKVTlInKZSCwbQnnzh3x2MdQCYtrThFZmGJWgt3RysQFXaxH08CUYFMB9tudgNesdaPiDIrXOh7ncD8uhhjViskpsUn6+N4NUUoulBijcbLRaE0OFZA5U/Qge6IGKygkMlRfcajfnpBKrrnfJodtYX8QmlySYBIY62gIcuj08wp7AgWJezl5RZ/7NsPUmjkZrhQUsNs6j6nKRFUVq3Ji8+FE5MPkH/wClPrlELgZWdrQG01vwQnES84tz19dttNesZLdMqcscgLf1JDdNxvHaXIcLXbuAk82vo1to17RIpjmHtqQGbX75GvIQMGylnDB8gAuU6vCpQKbZgCOYB+j6RvSTSGgKusdYIDhym3QXAtbZIHJ4KotaH9M+2kdl5/2vDska8D9X2Rb7Z4RkCMxjIPtb2Wb4z+6G0ioeOCJjVAD+0kj5/KESmVaG3gic9XKHRX/8mMBvK9tKMFWNVZSMqiz6eMQhLLFKrge8RKrZSV2KmtA1BUks7ph5nCQKrTiTBzJmLRokELQeaFWI8iAIBTh6RbXE2FJqZKgPaCTkPlp6gekUvVLXLUULBSpNiCNDC8jKKYjdYpR6oe6JtPIUTLlJ1WR6qskeh/3QKCypYfQ6+AufcDBvg8mbUFRITleYS7ZW9n0UUxQnCu1oLqTXi0lwpAuUJAG1pbgAci2dxq94r3iVKkrCgXSsZrc9x6vD0if33FkKOqib2IzeJTY9R0MLvEksAJzaJUUv0NwOrNrzMQ1xa4H9lqRO27mfv9ihmHVEmXKeZMyqUAUlJGYMpwQC4IsxBsY0MimWpSUzxNXNYzFrZDAFwhKQdXAJU+wbeOEjCJfaoUpKpiS4KBvYs3IwbqKDDMq1ZFpLWFxdtBdn8YMZM2Qk5NSfEqhhR14VLQlkj3/XOAqJpSVJv9fQidUEJzCn7VSQBlC2IfqbkeUDcPClZiptdtPfBTNYwKTjNWx5DQKKnSKgiOU9zrHTs40qpgSIgu7JtxoJfxAs8X9hwy0UlHKWkeHdYGKSwvCTULzrB7JJu33j+EfMxdExbSkp1cBrG/5XbWIugSsac75B2QyYtQSUJLZiAbDS/P6vELGp7S0DqtZtoCcgt4J83ghNpS/dLqaw/XbT3QvY/VBUwBDkSwAkmz5QxudWv5qED4VBlo8zfyUeWEkaBrDQOX0BYObM4Lix8QaUtgDzHTXTa3pAhCFAkqBSACxN2ublvHaJl8oBs1j46lukMaV1Prukfa8Yk05eP+Jv7fdd8x+jHkeNGRpUvJ2ocugnDWWeW3NufOGP9nIJqlKP3JavUkJ/OBmFYvLnKZBNlZyWZhnCg7nlB79mkt0T5v415Unolz8Ve6MBjfeC9xI/3TacKk5lMzxxXIA9pbHkI9nO3tZXPmRHOVJSNvNUaASRXWXPSLAkiIGMcN01YAZie8LBaSyh+fgYkTJoFgI0BL8j0jiAeVwNJTV+y9AKgmpV30kB0AsLPoR4ecar4WlYckhC1zFzUspRSLJBGgGnrsIcU1CnPeNrQucVLEyZndfs5WDkFncW6K06QvM0NGE3pbdJlLaUsoZQUi11Dm5JHhchrWPKIvFyHkKJe6W8xfzdifODFHI7tw12s7vueRbpsTHHFKcTUTZKQyghwA/JrPt7I8oXAwnJXkO+HP74Ve8OVxmylJJ76PVtj4xMGITSWVMVyUSkOQL8oU8BruwnAqsD3VdP+CIfJWLAnQEbcoKMKsMMOpaDIASFrLn6jWI05XRomzalJ0AHhAyrqEwPCe2sYvFTNgHPSI9DRLql5Q4lj21jboOvw18ZnDE8meJjHs0i5BbcHzH1eHbAsB7ouZclLkFmJD7Pr4mDtFpafVdAh+C4YQUyZYJSCLbC7nn4mGDGa1CSlDgNY6m1m9/wiBi+JyaZJEjuFRLqd1K0a+29hAGlzkibNT3PaRKPtTP5i75ZY8ydBEEj9ISjgQNxRrFcQKJZv35g0JAKUchu6m9BCvTHMCQdQNFsQou9iWLC2x9Y1qp0ybMKluoF72YnT0GnlEilkgDKQHdz3iN25Fri+kQV0baG4/8AilqnKygm43csSRZgNR7XvgnQ4cst3TlUkqSovdhmFnOots3LmMlT0kgAkE7kXDWsSbkvrbQaQy4PWSlpSEP3LrLF3yZdTr+TcolpIIIVpmB8RYRggrl+6p3/AIz6j84yGHt5H83qr84yNHxT2/PmvJ/6Lz/PkqDw6qcEHVNo+geEKIyqOVLAObKCQPxK7x9H90fPvB9J2tdKQfZKnV/Snve9m84ubjLF5smXL7GapDqZWUkE2faMpp2AuXqGMMzxGE45AjW6uscJiyd4R+CcVmLXNExalkhJGYk6ODr4iGwTYYjk3NtC1EHgyFhNqUFgaRzWs6mNBM9YkDD5ig+Vhq6rfrFy7CDSido/rA2qZUwjMMqSfO72HNyAP7TtBWqoZkrMO67OC9tW3+EA1yinZjyzOyjbVrWYv/MkwtK63AJ3TABhcvJikgEn2U8tH9RubdCYCYBPBqvacMQq9r9Sbx24inZUhKbsC57vI766knpA2h7gC37z6+Jv6B7fQXe+nfBHZCXtIHJz/CrjjiiEmvqJY2W/+QC/nAujqVpICVEB9AbemkM/7SaRasRUQhRM4IUm2vdAt6Xhk4S4ASgCbUMpeoD2ll7ON/E6baPDFWkGA3YS9TUlYsE2CRuoX56eEMeEcHqWrvJUtr5lWQ/Jv+WhgrsTkJUUpQaiYS+RAcO+5AvETEJ9fMSTMVLo5WnfWEn0Dq8iBEgAI7nOIRSnoqej706Ygt7KLM3pcwJxjjJU1kSEkAlgb30bKB9XgCmTSBTmZOql8kJyJfkoqdTeDRJoq+YFqSiQmmQLZw+YvtnV3tL91tIkuvAUhu33nD7LtT0SJawuoIXPIzJlk3SPxL/CP5d/C8QsTxEkqIUStbOSbbAf0h2bxHSB9biWZakSUmbMOyBmKv6iNfgPQwfwPgOpUtE6rUlMtwoygS5GrKbfz/KJa3oFRz7O53y/OiH0MibNcSZS1XsrKCGCWCXKmbdw/tPrDBh3B81Llapct+6xOYkO7vo8HMVw+Woy1hRliTplYBnBboLbR59jTVqRM7RQEskgM6SbMepA9Hi4YLornSnb7v74QibwoMwz1KQDZKEod2HVQewjtTcPLp1pOYFADuNyzabfpBM4eErK15VTpfsFKlMx07pNt9IFYNxJ2ncmZbixe6o4ho5Vml5B2m+6N5IyOXZp5H1/SMi+UvsaqXwuf2FZJWPxMfA2izeKpxVTocN3n0vcHWK1pZqE1kgrDpCw/wAB72i1OMK3PT5MoASoH4j5wn/1lO6bGpb8UH4Nm5Zx6oPxEPdStICGNyLgF+UV5wtNyz0HnmHuh/oqZy6j1MTBlqv7UbU1+SPcMTAVKBDEpdL8h/zASvxGetSkFZDEghNtD0jelrVieFoDhNr7jlDBRBEyapZlAMyn3zcvW8WkeAQD1WaGqLjM5R7JC0ErADi1yRa+ouD6bQvVs0JUVO6U737yuYbm9uhbaGLGphUtRAGZIypbmRe/9zHlmBhE4qqQhKZaWUTuWPqwBuXV/cIGcW5OtohrK4yfz85QObNVPmOTob3253P00G8FkCZOSggEJSXKku4HIWct9WgLTKyBzvpsx/48ILUACJE2coN3SA3LVR+XnCo954C0v8MDpTyePsE0IwuQudmMtKsoUhPduE51FgfujwvYR7iVZIbsyM7C8tAZIZKCy1ebxXdDOm1QUhCzKQS6gLFQJBeZM2HJIFy2sSsQwGXTyQUqK1AuQkWI6DU+evKGy817gWfFpWggSuo9v57KTxDWVSQlEn+EnvZkyUJSLzClLqZ9OsL+NYVMlrRMqpmfcgqJISGLOed/SGyVPqa2UlEuWlBIyKSzZRfvED2b6O0EqLAaWlmoE4KqKheUKWsukPYd02PoYkR7hyimcQ4IAOcDk/v0SnglFOZZppSpyVl0qKMqANu8phpr4b6Qcpf2crnMqtqSbuZcmyW/CVG5HO3g0PGJUBnS8j5Q400tsw2jESeylplhWguTDTY6NdFnvkDhuvN8V+BDsHXSy8yKdCZYSLsliWs5OpiJWVpWTskQMqq5HbrlyZLBu/MZgou7DpvbWMo8PmTZmaYwp0B1D8StQPDc+Qi1nhDAU2lpTPTMStCVWeXLJbujQqu3eNxyDbmxClSezCVoTKUBdKCGA20/OItKmakibLytOVmWSLhI7qU9AwDNuTEipl2JUWBe5IHjrHNObXOFAWVFqqSQvvqKVtZwo+hyn3RWlVRJTPKZZKkhfdG/O/NhvDmnDRRyiQe0My6QCNLAHlbM/lCupitXZpYu6lHYk5rte1gBoG1MLymwLGVoaVlOJafd7rt/1nIf5GPYjZeiP8j/AO0ewOym9o7fRI0+YEz0KOiVA+hBi4cNSmfTrXMQFAlkly462LfHSKSxFfei3OCpqhQy8ydWYnfuk/OBSnbCfgs2KzMa8/oCVpJlSpM1CkJLpOZySfHpDmqYVAAfeuT02hHnTyVkG7Fh4M/zhjwrEFqlJSkAkBna/T3Qt7OmtzmFF1wf/tvd1b9QTfqEfRkQGe/SGSnJlSgGdZDsfl6geML/AA/g5VNSpeg7xHhp74YKmtSieor0SlLEsG9py5tGjKeEpG2z3QmqJShazqgEkBzcvd0nYW1vFW41VdpOdjmubk8iABrFoY0r+B3TmC1X0sGclzZrAP8AzRVeP05kld3tYgHQm2rb3vy0MLSOxSf0zA59Hkn6D+1xoZapqkpFtQOnMs2g6xvxVU1KkdhKp5qJKSxUUKzTL3yhrJe5O7DbXfD1dhLlrAZUyYgAkXy50g9esWjwtMUpM1QsEghDgAZmJuA7XbmbPu0RE2unKLrH+JYBwwj59/r90hU+EmZJl08iWQxCgAoBZUNSet9TpDTRcFqmd6dMMtILhKSCosGurQOX0ex84ccKmlModqcy97uwN2eOgnoUGyt4FvhDNEi0iZdhIbz35QDCsPMgKSkuDoL9dX3vE77IklK1JBULA5XIfkdo2xbFMkpZkygpaUlgQ7n4n5tAXDMcmrlZ5wyqdgAkh+oBv08oMwhopAe5zzuKIcQVipUlRlNmTckkC29yw9YVqzF1mWMx0DrUPUt0iTUtVK7NRSWvlVfQ2JEa/Zcx7MB3sRzeJJJ4VQA3lQsJl/aMplux1J22jpioqEzPs8sDs1kJQzaaqJ3fV3sxgzVLl0NOcgGbQAbq/KBuC1CiV1c5CkoQ6ZYOqibEjo9n38o66FE5Vi2zbRgnCK4RUTFOlcns0pACXcONGvy5x3qpshSxJXkUvUIIBbrpaJFHXoWgTWIB0B1tACdxApVWZCZQSLAq+8QzubXF2i+7ApU20SHBAONq89r2aU3SkAMHsVEKcf2W8YAYXTsm5fwCtN3LNvb5RvxBXBdWtr5VFILPoSbcrlniBWV+VI74A2Sk78nJLbm51hR5skrY07aYAjTS+v8Au/8AWMhW/evRf1/fGRSkfHf6pLm9+YA7OQH5OYvKgp8lNTSnJASzkMT3Tf65RV/7O6JK6tM2YHlyz/uOnpr6RbNeGVLYkhyXPVMB1mIfzsVmaQbpj8HehS3icnLP8QPmIN8LzFMpKSB1PKBPEBaYlXl8Ik8NTmnsbpLOPFhGXo5Ns7StTURCXRRnqDXqPUBWXhDyJPak5gtYBUbhKBv626RBxLGKebNBmSnAZAJu6ncdG6nlBOqpp6ZQSgkJAICJaQT/AHEn4RAwzCVyJU4qbOsOE6kHQPt1jaeSXeSzYmxtj3E56Ue/58EK4kW6JKf5dtC/uHswjY6e0upWYlVrbOdtLvy/Vw4r7kyRL2UksegNh79NYDV1L2i05AAxD9cyhytpqbCF5OaWhogP19h/ag1tGkT5CSe6hSGA0YMA+wuqLFwupFPKQhQOeetWW1kubAj+4CK7nuqvuGYpAsN1Ow3Fh8It2RLlEjMErVJLDQ5FG3kYbAysouIjA7klRxRrKVAWsb+PKB2GUM2UkpnLSSTZKQbDzveJmOYrNlTZSEpcLF7OBrd9mYesDptSpyee73f5CLh4+SoWEAHuu37wHfCEl0kjMRYnQ5RqWPlAYS1NdRVckqVqfSw8BHHGjUKVLEgsn7xtr1fZo6YtTzVIySCApw5PLeIYS4nHCmQBoBB5+nxXLDaFEhS1ywc6zcm5N9LwZ/dI7NZUopWtLP8AhDvbx39I9w5KJeRMxYMxrOwJP4m2faIvEFa7yn9od7oD+cHDQ0IDnFxslCaamXMHZSyFgXc2Bv4lhp4wxzJYEtMtTKCUgGzAnw2gb9rRSoQnKSuaxs1g7D4/GJGJqmZF9ndZ08YltZXEOAB+SkrUBZmADAD6tAyvrAhMxTglCVKIGtgTHanUtKEdoXmMM3jCPjFAaSTUL7TOqccqbX7yiovzZL6cjEOcRwEWJjXXZz6pUmTyEZiq6w5L9S4A1118dtYYOFOEFT1CZMU0rRruqxDDNye5uPlG4VwVVSvOoFMpNiQ/ftoly7v94u3iItOmlCWkAAAJDJSNANgIpFFeSmJ9Rtw3lDv9H0f/AONL/wAlx5Bft19IyGNreyT8V/c/NUf+y6cpKpjozSlMD/UOXlFkYmEugpsNvSAnDnZIlJXKlJUhQfuEAvvbnBXGZjhJZu6lTbjcg9Yytb/i2/H0Kd9nf59vdrvRCeJpbyZivwsR8I44YSJm4cOPXaJ+IJzyZyecsn0H6QPpcRC006QCCmXcku9kC3ppGHFwD2WgJjHo3ED9LgfkQVY9PxnLM1SSWYjbUsHu5FieWoaJdTjSJoKEKdQDm42vuXN/lCNhcgCdNnKDSUgOdM5ICsqfW5/OCfDVdLmzZmUZUZdNk94adDr5RuNkJwlJdPG0FzbwonFs4kyVPlIBBcc/H+YEPYXERcLxMfaUJLEJmPp+ElrfLlEziNWaalIHecFWVy+rjvcszdcsCcAH/UqaxGYhk65rJF7j2i/jFDTpaTLCY9K53l6hEEsvEyu/dKMw5lgouRqz2fm/i+YbQJohUT5kwETVZ9PZSHN+ZvCb2U5Cx2MtK1TFkKWrRCAQ241F36bw5cQlJQJJ76SjKR001hzYFk+I7bs6UB8kCxDHEmWqcCVh9BzJAA6axxwzEROl5wCLkEHmLR5QyUSgEJDpBcvqfGJi0hybJTcnoBE7STZ4UF7Q2gM2sw2aFlbA91WVzoSzlubWidhiFmYvNLyy02ClarV/KPw9Y7SsiQ50Afo2pJ+Mc/3whcsrSbAtcb6/ODBtVlB3DOFCxinlCZ2xcrswexI0JHT5QGwvAwakz1LKtVKHPZieXSPK6tUlMyeoFWUOlPR/okwW4bnrXJK1oy52bW/Py/WIIa4i0Rpc0HaelFTKmUhagtSUlSPZJHsx5LUAy1g5dAeZ+n9IEY9TT1TUZFhMtg99CCSbbuGH5QZzS+yAU+oPo/56RdxOaCo2rG7hQp8pai4BIIceH0YQcfRPqlSJYlLSFLJU5Toz3vbuhfh8bJNShIAD6aN/T66QtT8QkpnLIDZAHsAAo9oo69FAnXaBuusokZ97CiUvE8imUinKWASxUNEcg2ump+g0KngpCgXBGYMdRt6xWUkdolVROkJBP/bQykhbJKrMXWs2v0jrTYrMl1HZICkSwPYJUtBs5UFKYpAfZwSdIhkx68JmbTMA93kcp++0r/GmMhL/AH4jmfSPIt4oSvhnsgn7NKmWAZU2XdNwoatvbdodcZZw2hFvCK0pQUkLQSlYLgjYw2pr1LSlUwMpYfpa1vFn84zdQb2/v6J/2bH/APU1/a/qilAMwX/QzeRhRwWZ/wBvmMyfn8oY8MnstZOjAet/lAAyuzmtsVH4H/iMdo2uLU++MCHUMPb0sppnSamfLTLlJK0IFw4DOXu5EMfCWETZOcKSLpZDTJd1OXy3J6lxo3KEZc9apSkoJCiO6QWvqB4HSImASq8Z5omiWEAA5lFy5VZIALtkUT0EaWndj4LH0kzpofD6jH8Jgx1KU1ASvMmYXJu+/dBIuf1iLw4QmbPnK1QkqVfZIKw/+AHgREyVKQoArWJk25KujgWubMTz35214XpP4U5Z/wDlmFA8AxU/uEGiFyBaUrq0rvMj1/pT8MqSuVLmaFSQW5PHaskqmTJays937vM7HyiT9nIQcodQByjmdhHnCcuctJVPl5S9nBBI8DfWNAsugVkeJtJLcf2tqjCZk+XkQvs3IdV9HuzQfqMNT2aUKcpAA11A0fnEfA11BVN7dAQgH+GGYtf1s14H4vXVX2qWlEt5JZ1NYXZTnZhfrEja5t0qvDmPq8jsmBaE5CFMQoMR0bSFdMyUomVJACJamUB+Lx3+uUSOIp5Wjs0LKcxuRrl3D7cniLgOGIkpEuWlnLm5JJO5JuYucmlSgBaKUstABXMIShOr+4ecTVVSZneSXTsRHPF6FCpQlKJFwpx+LTlflESlkpQhMtI7qeepOvziRdqFGVjEtVQZAfMLG1nZ2eOuPrmSpQXLTmIIGhLAvdhry84l0WCShM7bIyzqXOvNtHaJWMVyJSHWsIGxJaOG6juV37SQIwePqlmpxIppjOmdxQQVKcaW+fLrFLicuZMQlZzqV3zuXJ01ubNDTx9xB28wSJb9kHJI0WoC3TKNevpC7gktlLmlxkDMogZiHsH/AEv6Qu8hxpHj3MFjlNM+pIEpScqp6zkIN2KhmAZ2DWJ6CJSadahkzOSxWbMLAEAgDUh+gtAXB2SAtVnGVBKgzFipR11Iclxy2g7IxaTLFiVn+W7+dh74G53RS7PGV0/0/wBfhGRn+qEf+KZ6p/OMgdhV2v7IRw9hJnKIHdloDzFkWSn5k7Dc+ZhnxXCadNOB2rT2TkD2SBzHNo648E0olUUpiQDMmn8ayN222AisazE5yJhzu5Jtf0isrATtKYgc5g3N6pskJmi5yFz3iFM9tQCLeECa2VNDOBqpi+rl/mbQOlYxMJbIp/0eOyps5VynLlL3N7Qs+KIG+qPJLIWPDhyM/AIxhyZgDtcbQQmTzLQllZ+0Jspxl6KAN8p9QeQEdOGZoWlla/nHTiSSAqURo6gr/F/kYFE6nnzWJoZduo2Dh2P4XbDjlQElXtWuOe2mhAA31PV5uIVSJFXIpEMyZSlLZTtMUpyPEBJ90CMOUFTwqwRJAmKbYi6R/kf9pgQJq11iZqz7St+TZR7nMPQNo7lv6xwIEQ6Cz9v5VgzceTLmoliWVZmuDzLWDXg/U4hLkoMxZAAhWpZ4BBcZk+DiJVUkVKTLWCx3GobeG7dmysl+2hQqufNM1FXicntczhQsRp9bQIxPHJSVGWkuoagA68nZtxEeSlFLJEtJORAJvckkkn1J0gFg61zc82ZL7PMolKd8rBs3XWLAltAKGtBBcVGxWmqpkyWuUogXzMpmNmd9Q214fuH5QS61XKALcybfnCnQYkJtT9mQk5nZ9n1+jDpVhKAEJ0SLnmrcmOaBeFz3ktDa4QjFapZmpsMqnzHrZh8fT1k4XJUoJKrFhmfY7gRHXUpBAJSCrQEgP4c4lfawlJUpQAAd+UEApxNqhdbQ0BR6CfPEyYqZZLMkEi19Q2loR/2i40iYtMlCnWm61OAEpLak76Fht4wV4g4tliQpcs3fKm2/NuQF4rCeSEqmKUpV8zkgBSix0F1fdcnns8BleK2hNaeItdvdil7NkHKlaDmCRpv0drO4fyjhS0xKUICmUt3Up2QACT0c39PUxg1EpEs5/ZVK7Qq5hifmX8ICTKpkomC+ZJSzsy9DYaj7zH8UCHmiSc4PT1UyW02YV/d0R0SLD8/OCiJdogYcmwgmmF3nKIxuF5kjI6PGRRXperxlU+tEyb/DzN5JYgHzAfzg3xp9inql5Sy0i5S22j9ecAKGV9sr5CBLylSyiYk37rEkvyAf1EcONOH10lSqXKUVJIzJJuT0+uUEfW7JXAEHGERpKdCFFaZgJIa6Qfrb0iDXTUhY7zhRYsIGU1NUN3ikaBncudoOL4aVLKDNVmzhwz206dRzhaXw48kIkQfO/aDkj5hdMMmhBSpOgJHk7Qex6YDJz/hKVE9HY+4mFulRkQE8iR74ZMGqgcrsQCHB0Idi/lC1+9YXmrMWpDiOHfdCMJWpUtIa81WZZ5l7C566fzHWNq+lCVJJLqSr09GA9IZcW4ZKD2kgBSAP+3oU/wBJ0I6H1tCxXImKsEq1v66Hk0a0b21hb0jS4lxPKlJw4TZyJiVFKkkO33gPg+nhBzGJ8+R2fZANftCWZ7MC92Z9L/MOJ8ukzVExZISnKEjmdX5l2A5fDyirTWZZr93Yctj5wxVhKbgx18ohNxhCpiULVlKvZBfwc8ngtLRAebwzLqJiFKcFNu6bEO7Gx35XhgrMDmTUGShSUKUQCS7Zd4vkAlCbRcATSnUmGZZU2fLSlM8pyS1sAeve8LP16RBwtMxEsiaS+YkOpy3UwVxGeiRISnMezkICcx1LC58T84CyMRROTmQX5vECrvqrbyGlg4tD8VwLt5yJnaZcoAIyvYEl0l7G/wAIMVyUlCkq9lQIPgzQIxPHewWlOUlw5L8y1huY9xWrzd1Pn+UduaSQFBje0Bx68JK4lw5IQDLByhym5Jfdz1SH/sbeFnGVHIhLvZJD7uAfDVXu6Q64XXKqRMTkypSWSd7eO4LGE/FJLT0y8veSQS1mSn7oO/IHond4CQOQmw5wtj+f5TCJwm0vZpUEkhKS/wB0P323INrb5xzhQxiSJS+zAtne+osPQ8x0hpw6kJRMmhSVKTqO/YAd5SSN2DtbbnCnjRGdwdSC121J30sw9Y67VZG7Rji0cw3QQTTAvDDYQUBhU8o7eFvGR48ZFVa1HwusVQzlT0fxJqhkT+J1EOWGpJszRyx3jConrSVpYi2kT+GMJ7JH2hftrH8N/upOquhNwOjneIeJ04USoDWw8/p/OAHVNMpaBwnpdLs0xmcc4AHe8LtwlSGbME1bsnvN12f3mGLFpyu0l5i4YgDlp8m9I14akhMtZH4mHgAPzMe48luzP8xH16QjqHl0hCHpqbrQ0ccfRCcQDK6G/nHXDFsojnGmNjuBXIxGpKgMIvEbYFhe24vD1bwOufn/AHaYP9WzlkpLApJFuhifRViFkGYkEjfT15wp1KAkhQ0V8fr5x3pav1jQaLFhOQT+JGHJtx7DZNSggpDnXr5j4xpgWFBKEolJypTZuXN+v5xAoat9TBeVNUk5kHxHMfnB4JfDNO4XTR7xY5UzAMHnyu0mTlgkl0JJ0udSBya3TrEviOQqZLRKTNAUS8wsxIszNodbPaF6k4kUuqMhSSMocF+j3Hu8REHHMa/jJlCaEvdbOV8wNGDh766Q2dhZtCDcjZN9Zq+ExYpUImAyiMySCFX1cMf+Yi0NNLkpyywz3LlyfEmAk9RWlQdSc26SAR4GPaKmElJdaiHclanMcDlCoVyp2L1SAxUAVf8Axghy+zch1gRhVematctiFI1J+9difUe+OdPN7eoK2skW+Af1JiXllSGWSlJUbqa6j1YeMT5rgCcBTpi0SkKWpgkB1H61/WKvXVFcyZULB3OzAMco8c2VodeMq1JkplJIPakHX7qWUdL6tCJiyD2SWYJewH9LOdyTl3ikh7I8LaFlGMErZiJNllglRKQ2p7idrF5hNvWAmPTjMWkl+84HS/PUiDtNKIkZGNxazuQ9ju5dN7sEpgPNld8ONBr4bjprEDmlaSiwlScKmWEF0qheols46mDNMuFnDKIw4UuMjWMiiImHGqaepwJZDkAMRYPlAF/KAtRYy0kMQb+N1fp5Quq/aBVkv/D9rN7B1zZvxcxEakxqrqJ6US0JXNWo5UpTqo7C8Lx6EsqkfW+1G6gxtqmtNn9uFZ2BpanSeZUf9xjnjgGRJ5LHzEV1J47qkoCB2bDTufrHOu40qZqChWRjySx+MBOglLycJRmqa3UeL0u04Vc5MyUoJLsPhACTUsAGJgHK4jnJDDI39P6xykY5NSoqGVz0/WDxaN7AQhe15maqUSR9qz8SneROExBTvqPHb8vOOEucRYgg8jCkOIZwLjID0T+sda/iifNXnVkdgLA9eut4YZC5vKS0txWDwnmmqdDDBSYkGAJioUcQThpl9P1jqOKaj+X/AB/WLGElPjUNVyFaF3fKpmzAB25eEBJuFBEztFJCj+Mb+PWK6RxfUjQo/wAf1iQjjqrAZ0HxT+sWY17VV0sbu6cMdXnKAlZTlJJDG+l9tL+sQ8bqahaUJlB1KID/AIRzP5wqL4uqDqJf+P6xzHFU/bIPBJ/ODhx6hAOzoVaWGUYlSxcPudHLXMbYjTS5qQF7XDHSKwk8Y1KVJX3CUuzgtdv5ugjSbxdUqSUkpYhvZ29YvuBFEKoJabBRLFMVzrURoBlR0QxZjzVrZrc4xdKVyCBqkP8A4FvhmMLIr1dOW+jNz5RLlY/OSCBlYu/d5jKfdAx5o3ijHkm1U5K6eWpSCcrsAA77h9faY+HhAqomDO2cm5ABLsG+LgwHGOzcuVklLu2Wz6PrHiccmDRKP8f1ib8lzpGkEAml2XNKVKsdeUM2E4bOWASgoSUlSSfvMMzMLgkaPCt+/wCa3sob+n9YnSuN6lKQgJlMP5S/slOuZ9D8IoW3yoEgHCbf3JVf+Ffqn84yFj/X9X/9for/AN4yI8MK/jpUi7f2UYvSyaKUmdVU6T2pWULmS0GWoTpTEpPeWSkKOckAJDAamKSjIIlV9DUfENJKlU4+2UxUgyUBQmSh/CMyizgIYdkkJE0ZLkBClEuS3mI1smooJqpU2TMVLpJ5mZCkkE02Uezyyt0tzEfPUS6fFJ6Ja5KJ01Epfty0rUEK27yQWPnHLlEjIyMjlyyMjIyOXLIyMjI5csjIyMjlyyMjIyOXLIyMjI5cshjwGVNXKGSopZSQsgJnLSC7O7KSbXts45wuRkcuTkuTOKz/ANVRhJlAumYlsoJYXY5+8SX82sI2TT1UtChLq6NQlpulKwSAlkBsydyBuzkO0JcZHLk2YjTz+zWV1lIsBBGVKxmIBVZICRex11Cm3hTjIyOXLIyMjI5cv//Z",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 7,
    name: "Sadman",
    lastMessage: "ok ok ok",
    timestamp: "8:45 AM",
    profileImage:
      "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-1/385330492_6554233691328915_494201276600721692_n.jpg?stp=c0.266.1536.1536a_dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeETea-s8NPRGjiaPwiiCzWqqOmThyQYTH-o6ZOHJBhMf1BYXhajL1FlYyt-e7wIrnsaLs9ZRqoMN4BNBl6HYbkP&_nc_ohc=Pu7P0X4O68MQ7kNvgGLMcWL&_nc_zt=24&_nc_ht=scontent.fdac138-1.fna&_nc_gid=AfbHs1N60IWwmdGBPnVu5Fs&oh=00_AYC_L4eQtFoEY3My8d_8IicMeNb-HSM0tMrVTuCf1SpUvg&oe=679ADEC4",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 8,
    name: "Hasu Apa",
    lastMessage: "Can you tell me your experience?",
    timestamp: "8:45 AM",
    profileImage:
      "data:image/jpeg;base64,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",
    unreadMessages: 5,
    isOnline: true,
  },
];
function Chat({ isOpen, onClose }) {
  const [chatselect, setChatselect] = useState(null);

  const chatselection = (chat) => setChatselect(chat);
  const closechatselection = () => setChatselect(null);

  return (
    <>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
            }}
            onClick={!chatselect ? onClose : undefined}
          >
            {chatselect && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "65%",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                }}
              >
                <button
                  onClick={closechatselection}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaArrowRight size={35} />
                </button>
                <div style={{ marginTop: "50px" }}>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    {chatselect}'s Chat
                  </h3>
                  <div
                    style={{
                      backgroundColor: "#f9fafb",
                      padding: "20px",
                      borderRadius: "5px",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      overflowY: "auto",
                    }}
                  >
                    <p style={{ color: "#374151" }}>
                      Start chatting with {chatselect}...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "35%",
              backgroundColor: "#fff",
              boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)",
              borderLeft: "2px solid #000",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid #000",
                backgroundColor: "#e5e7eb",
                height: "115px",
                padding: "0 20px",
              }}
            >
              <h5
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Inbox
              </h5>
              <button
                onClick={() => {
                  onClose();
                  closechatselection();
                }}
                style={{
                  color: "#6b7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <RiCloseLargeFill size={35} />
              </button>
            </div>
            <div
              style={{
                padding: "20px",
                overflowY: "auto",
                height: "calc(100% - 115px)",
              }}
            >
              {inboxChats.map((chat) => (
                <a
                  href="#"
                  key={chat.id}
                  onClick={() => chatselection(chat.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    borderBottom: "2px solid #000",
                    cursor: "pointer",
                    backgroundColor:
                      chatselect === chat.name ? "#6b7280" : "#fff",
                    color: chatselect === chat.name ? "#fff" : "#000",
                  }}
                >
                  <img
                    src={chat.profileImage}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #d1d5db",
                    }}
                    alt={chat.name}
                  />
                  <div style={{ marginLeft: "20px", flex: 1 }}>
                    <h4 style={{ fontWeight: "bold" }}>{chat.name}</h4>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <small style={{ color: "#6b7280" }}>{chat.timestamp}</small>
                    {chat.unreadMessages > 0 && (
                      <span style={{ color: "#d32f2f" }}>
                        {chat.unreadMessages}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
